const express = require('express');
const actionsRouter = require('./routers/actionsRouter.js')
const projectsRouter = require('./routers/projectsRouter.js')
const server = express();
const PORT = process.env.PORT || 4000;

server.use(express.json());
server.use("/api/actions", actionsRouter)
server.use("/api/projects", projectsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(PORT, ()=> {
    console.log(`Server listening on port ${PORT}`)
})
