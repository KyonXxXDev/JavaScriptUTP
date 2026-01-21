import { Router } from "express";

const router = new Router();

router.get('/', imageController.getAll);

router.post('/', imageController.create);

router.put('/:id', imageController.update);

router.patch('/:id', imageController.update);

router.delete('/:id', imageController.delete);

router.get('/:id', imageController.getById);

export default router;