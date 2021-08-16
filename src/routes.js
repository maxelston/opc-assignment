import {IndexController} from './controllers/IndexController'

const _routes = [
	['/', IndexController],
]

export const routes = (app) => {
	_routes.forEach((route) => {
		const [url, controller] = route
		app.use(url, controller)
	})
}
