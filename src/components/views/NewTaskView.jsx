function NewTaskView({ handleSubmit }) {
    return (
        <section>
            <h2>Add a New Task</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="taskContent">Task content:</label>
            <input type="text" id="taskContent" defaultValue="" required />
            <button>Save Task</button>
            </form>
        </section>
    )
}

export default NewTaskView;