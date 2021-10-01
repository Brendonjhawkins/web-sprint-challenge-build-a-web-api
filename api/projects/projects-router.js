const express = require('express');
const Projects = require('./projects-model');
const {
    validateProjectId,
    validateProject,
} = require('./projects-middleware')


const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const users = await Projects.get()
        res.status(200).json(users)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, (req, res, next) => {
    try {
        res.json(req.project)
    } catch (err) {
        next(err)
    }
})

router.post('/', validateProject, async (req, res, next) => {
    try {
        const newProject = await Projects.insert({
            name: req.name,
            description: req.description,
            completed: req.completed
        })
        res.status(201).json(newProject)
    } catch (err) {
        next(err)
    }
})


router.put("/:id", validateProject, (req, res, next) => {
	Projects.update(req.params.id, req.body)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => next(err));
});


router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        await Projects.remove(req.params.id)
        res.json(res.Project)
    } catch (err) {
        next(err)
    }
 })

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(actions => {
            if (actions.length > 0) {
                res.status(200).json(actions)
            } else {
                res.status(404).json((actions))
            }
        })
        .catch(next)
})

// eslint-disable-next-line
router.use ((err, req, res, next) => {
  res.status(err.status || 500).json({
     customMessage: 'error post routing',
     message: err.message,
     stack: err.stack
  })
})

// do not forget to export the router
module.exports = router