class ID {
    static id = 0;

    static setId(newId) {
        this.id = newId;
    }

    static getId() {
        return this.id;
    }
}
export default ID
