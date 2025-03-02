const getStatistics = () => {
    const timesFinished = localStorage.getItem("times-finished");
    const timesStopped = localStorage.getItem("times-stopped");

    return{
        timesFinished,
        timesStopped
    }
};

export default getStatistics;