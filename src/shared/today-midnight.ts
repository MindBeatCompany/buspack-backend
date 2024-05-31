function todayAtMidnight () {
    const now = new Date(Date.now());
    now.setHours(now.getHours() - 3);
    now.setHours(0,0,0,0);

    return now
}

export default todayAtMidnight;