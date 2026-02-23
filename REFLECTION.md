## Q1 - Reactivity
When you type inside the <textarea>, the character counter updates automatically.
**Explain why this happens.**
Your answer must mention: v-model, Vue reactivity, and what data property changes.

When typing inside the <textarea>, the character counter updates automatically because of Vue reactivity and `v-model`. The <textarea> uses v-model="stickie.text". This means when the user types, Vue automatically updates the text property inside the stickies array. Since stickie.text changes, Vue's reactivity system detects the change. The character counter calls charCount(stickie.text), so when stickie.text updates, the DOM updates automatically. v-model updates stickie.text, Vue reactivity detects the change, and the UI rerenders with the new character count.

## Q2 - Deep Watch
We use a deep watcher:
```
watch: {
    stickies: {
        handler() {
            this.saveToStorage();
        },
    deep: true
    }
}
```
**Explain what deep: true does and what would stop working if we removed it.**

`deep: true` tells Vue to watch for changes inside objects in the stickies array, not just when the entire array is replaced. When typing in a note, we are changing stickie.text. This is a nested property inside the stickies array. Without `deep: true`, Vue would only detect changes if we replaced the entire stickies array. Editing note text would not trigger saveToStorage(). If we removed `deep: true`, typing inside the textarea would on longer auto save.

## Q3 - localStorage
1. What type of data does localStorage store?

    localStorage only stores strings.

2. Why do we use `JSON.stringify()` when saving?

    `stickies` is an array of objects, not a string. We use `JSON.stringify()` to convert the array into a string so it can be stored in localStorage.

3. What would happen if we forgot `JSON.parse()` when loading?

    If we forgot `JSON.parse()` when loading, we would get back a string instead of an array. That would break the app because `stickies` needs to be an array to use `v-for`, `push()`, and `filter()`.

## Q4 - Delete logic
**Given:**
```
deleteStickie(id) {
    this.stickies = this.stickies.filter(s => s.id !== id);
}
```
**Explain:**
What does `.filter()` return?

`.filter()` returns a new array containing only the items that pass the condition.

Why assign the result back to `this.stickies`?

We assign the result back to `this.stickies` because Vue reactivity detects when the array reference changes.

Why `!== and not ===?`

We use `s.id !== id` because we want to keep all notes except the one that matches the given `id`. If we used `===`, we would keep only the matching note instead of deleting it.

**Hint:**
`.filter()` returns a new array that only contains the items that pass a condition.
We use `s.id !== id` so we keep all notes except the one we want to delete.

## Q5 - Architecture decision
Why is saving implemented in a separate method (`saveToStorage` ) instead of writing localStorage
code directly in the watcher?

Saving is implemented in a separate method instead of writing localStorage code directly in the watcher to keep the code organized and reusable. It separates concerns (watching vs saving logic) and makes the watcher clearner and easier to read. If we ever needed to save another method, we could just call saveToStorage() again. This makes the app more maintainable and easier to understand.