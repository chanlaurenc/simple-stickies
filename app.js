Vue.createApp({
    data() {
        return {
            stickies: [],
            storageKey: "sticky-notes-simple"
        };
    },

    mounted() {
        // ================================
        // COMMIT 2 — Render Notes ONLY
        // ================================
        //
        // For Commit 2:
        // - DO NOT use localStorage yet.
        // - Temporarily hard-code TWO example notes here
        //   so that rendering, v-for, v-model and the
        //   character counter can be tested.
        //
        // Example structure:
        //
        // this.stickies = [
        //   { id: 1, text: "Test note 1" },
        //   { id: 2, text: "Another note" }
        // ];
        //
        // In Commit 3:
        // - REMOVE these hard-coded notes.
        // - DO NOT keep them in the final version.
        //
        // In Commit 4:
        // - Replace this with a call to loadFromStorage().
        
        /* REMOVE FOR COMMIT 3 TASK
        this.stickies = [
            { id: 1, text: "This is a test note" },
            { id: 2, text: "Another note to show it works" }
        ]; 
        */

        this.loadFromStorage();
    },

    methods: {

        // ================================
        // COMMIT 3 — Add & Delete
        // ================================

        addStickie() {
            // TODO (Commit 3):
            // Add a new object to this.stickies
            //
            // Required structure:
            // { id: ..., text: "" }
            //
            // For id:
            // - Use crypto.randomUUID() if available
            // - Otherwise use a fallback (Date.now() + Math.random())
            let id;

            if(crypto && crypto.randomUUID) {
                id = crypto.randomUUID();
            }
            else {
                id = String(Date.now() + Math.random());
            }

            this.stickies.push({
                id: id,
                text: ""
            });
        },

        deleteStickie(id) {
            // TODO (Commit 3):
            // Remove the note that matches the provided id.
            //
            // Use Array.filter()
            // Reassign the result back to this.stickies
            this.stickies = this.stickies.filter(s => s.id !== id);
        },

        // ================================
        // COMMIT 5 — Clear All
        // ================================

        clearAll() {
            // TODO (Commit 5):
            // 1. Use confirm("Delete all notes?")
            // 2. If confirmed:
            //    - Clear the stickies array
            //    - Remove the localStorage item using this.storageKey
            const confirmed = confirm("Delete all notes?");

            if(confirmed) {
                this.stickies = [];
                localStorage.removeItem(this.storageKey);
            }
        },

        // ================================
        // Helper — Character Count
        // ================================

        charCount(text) {
            // This is already complete.
            // Returns the length of the text or 0 if empty.
            return (text ?? "").length;
        },

        // ================================
        // COMMIT 4 — Persistence
        // ================================

        saveToStorage() {
            // TODO (Commit 4):
            // Save this.stickies to localStorage.
            //
            // Must use:
            // JSON.stringify(...)
            localStorage.setItem(this.storageKey, JSON.stringify(this.stickies));
        },

        loadFromStorage() {
            // TODO (Commit 4):
            // Load notes from localStorage.
            //
            // Must:
            // - Use JSON.parse(...)
            // - If nothing exists, set this.stickies = []
            //
            // In Commit 4:
            // - Call this method from mounted().
            // - Remove hard-coded notes from Commit 2.
            const stored = localStorage.getItem(this.storageKey);
            
            if(stored) {
                this.stickies = JSON.parse(stored);
            }
            else {
                this.stickies = [];
            }
        }
    },

    watch: {
        stickies: {
            handler() {
                // TODO (Commit 4):
                // Call this.saveToStorage() here so edits
                // auto-save without clicking any button.
                this.saveToStorage();
            },
            deep: true
        }
    }
}).mount("#app");