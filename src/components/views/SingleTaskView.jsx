function SingleTaskView({task}) {
    if (!task) {
        return (
          <section>
            <h2>Task not found!</h2>
          </section>
        );
      }
    
      return (
        <section>
          <article className="task">
            <h2>{task.content}</h2>
            <p className="task-title">{task.content}</p>
          </article>
        </section>
      );
}

export default SingleTaskView;