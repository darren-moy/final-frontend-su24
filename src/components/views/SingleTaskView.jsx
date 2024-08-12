function SingleTaskView({task}) {
    if (!task) {
        return (
          <section>
            <h2>Task not found!</h2>
          </section>
        );
      }

      let priorities = ["Low", "Medium", "High"]
    
      return (
        <section>
          <article className="task">
            <h2>{task.content}</h2>
            <p>Priority: {priorities[task.priority - 1]}</p>
          </article>
        </section>
      );
}

export default SingleTaskView;