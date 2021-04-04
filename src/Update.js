import * as R from "ramda"
const MSG = {
	SHOW_FORM: "SHOW_FORM",
	MEAL_INPUT: "MEAL_INPUT",
	CALORIES_INPUT: "CALORIES_INPUT",
	SAVE_MEAL: "SAVE_MEAL",
	DELETE_MEAL: "DELETE_MEAL",
	EDIT_MEAL: "EDIT_MEAL",
}

// change showform to true/false
export function showFormMsg(showForm) {
	return {
		type: MSG.SHOW_FORM,
		showForm,
	}
}

export function mealInputMsg(description) {
	return {
		type: MSG.MEAL_INPUT,
		description,
	}
}
export function caloriesInputMsg(calories) {
	return {
		type: MSG.CALORIES_INPUT,
		calories,
	}
}
export const saveMealMsg = { type: MSG.SAVE_MEAL }

export function deleteMeal(id) {
	return { type: MSG.DELETE_MEAL, id }
}

export function editMeal(id) {
	return {
		type: MSG.EDIT_MEAL,
		id,
	}
}

function update(msg, model) {
	switch (msg.type) {
		case MSG.SHOW_FORM: {
			const { showForm } = msg
			return { ...model, showForm, description: "", calories: 0 }
		}
		case MSG.MEAL_INPUT: {
			const { description } = msg
			return { ...model, description }
		}
		case MSG.CALORIES_INPUT: {
			const calories = R.pipe(parseInt, R.defaultTo(0))(msg.calories)
			return { ...model, calories }
		}
		case MSG.SAVE_MEAL: {
			const { editId } = model
			return editId !== null ? editMeals(msg, model) : add(msg, model)
		}
		case MSG.DELETE_MEAL: {
			const meals = R.filter((obj) => obj.id !== msg.id)(model.meals)
			return { ...model, meals }
		}
		case MSG.EDIT_MEAL: {
			return edit(msg, model)
		}
		default:
			return model
	}
}

function editMeals(msg, model) {
	const { editId, description, calories } = model
	const idx = R.findIndex(R.propEq("id", editId))(model.meals)

	const meal = { id: editId, description, calories }
	const meals = R.pipe(R.remove(idx, 1), R.insert(idx, meal))(model.meals)
	return {
		...model,
		meals,
		showForm: false,
		description: "",
		calories: 0,
		editId: null,
	}
}

function edit(msg, model) {
	const { id, description, calories } = R.find(R.propEq("id", msg.id))(
		model.meals
	)
	// const meals = R.reject(R.propEq("id", msg.id))(model.meals)

	return {
		...model,
		editId: id,
		showForm: true,
		description,
		calories,
	}
}

function add(msg, model) {
	const { nextId, description, calories } = model
	const meal = { id: nextId, description, calories }
	const meals = [...model.meals, meal]
	return {
		...model,
		meals,
		nextId: nextId + 1,
		showForm: false,
		description: "",
		calories: 0,
	}
}

export default update
