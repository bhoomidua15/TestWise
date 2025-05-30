module.exports = (socket) => {
    console.log("Client connected")
  
    socket.on("disconnect", () => {
      console.log("Client disconnected")
    })
  
    socket.on("updateTime", ({ testId, timeLeft }) => {
      socket.broadcast.emit("timeUpdate", { testId, timeLeft })
    })
  }
  
  