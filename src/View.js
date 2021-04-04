import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import {
	showFormMsg,
	mealInputMsg,
	caloriesInputMsg,
	saveMealMsg,
} from "./Update"
import tableView from "./table"

const { pre, button, h1, div, form, label, input } = hh(h)

// form
const fieldSet = (labelText, value = null, oninput) =>
	div({ className: "my-4" }, [
		label({ className: "block" }, labelText),
		input({
			className: "p-2 border-2 border-black w-100 appearance-none",
			type: "text",
			value,
			oninput,
		}),
	])

const btn = (color = "gray") =>
	`py-2 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 bg-${color}-500 hover:bg-${color}-700 focus:ring-${color}-400`

// add meal button
function formView(dispatch, model) {
	const { description, calories, showForm } = model
	if (showForm) {
		return form(
			{
				className: "w-full",
				onsubmit: (e) => {
					e.preventDefault()
					return dispatch(saveMealMsg)
				},
			},
			[
				fieldSet("Meal", description, (e) =>
					dispatch(mealInputMsg(e.target.value))
				),
				fieldSet("Calories", calories || "", (e) =>
					dispatch(caloriesInputMsg(e.target.value))
				),
				button(
					{
						className: `${btn("blue")} mt-2 mb-8 mr-2`,
						type: "submit",
					},
					"Save"
				),
				button(
					{
						className: `${btn("gray")} mt-2 mb-8 mx-2`,
						type: "submit",
						onclick: () => dispatch(showFormMsg(false)),
					},
					"Cancel"
				),
			]
		)
	}
	return button(
		{
			className: `${btn("blue")} my-8`,
			type: "button",
			onclick: () => dispatch(showFormMsg(true)),
		},
		"Add Meal"
	)
}

// total page view
function view(dispatch, model) {
	return div({ className: "max-w-60 w-full" }, [
		h1(
			{
				className: "text-4xl border-b-2 border-black font-bold py-2",
			},
			"Calorie Counter"
		),
		formView(dispatch, model),
		tableView(dispatch, model),
		// pre(JSON.stringify(model, null, 2)),
	])
}

export default view
