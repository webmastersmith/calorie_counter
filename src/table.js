import * as R from "ramda"
import hh from "hyperscript-helpers"
import { h } from "virtual-dom"
import { deleteMeal, editMeal } from "./Update"
// import trash from "./img/trashCan.svg"

const { table, thead, tr, th, tbody, td, i } = hh(h)

// 	tableTotal
// const meals = [
// 	{id:0 description: "Breakfast", calories: 460 },
// 	{id:1 description: "Snack", calories: 180 },
// 	{id:2 description: "Lunch", calories: 600 },
// ]

const border = `border border-black`
// tableHead
// 	1. tableHeader
const tHead = (item) =>
	thead({ className: `bg-gray-400 font-semibold ${border}` }, item)
// 	2. tableRow
const tHeadRow = (arr) => tr({ className: `${border}` }, [...arr])
// 	3. tableHeadCell
const tHeadCell = R.map((title) => th({ className: `${border}` }, title))
const tableHead = R.pipe(tHeadCell, tHeadRow, tHead)

// tableBody
// 	1. mealsBody
const tBody = (row) => tbody({ className: `font-medium ${border}` }, [...row])
// 	2. mealRow
// prettier-ignore
const tBodyRow = R.curry((dispatch, model) => {
	let counter = 0	
	const rows = R.map(({ id, description, calories }) => {
		return tr(
			{ className: 
				`${border}
				${counter % 2 === 0 ? (++counter, 'bg-gray-200'): (++counter, '') }`
			}, [
					td({ className: `pl-2 ${border}` }, description),
					td({ className: `pl-2 ${border}` }, calories),
					td({ className: `${border} text-center` }, 
						[
							i({ className: `icon-trash-2 mr-2 text-red-400 cursor-pointer`, onclick: () => dispatch(deleteMeal(id))}),
							i({ className: `icon-edit ml-2 text-blue-500 cursor-pointer`, onclick: () => dispatch(editMeal(id)) }),
						]),
				])
	})(model.meals)
	// Total Calories add on
	const caloriesSum = R.pipe(
		R.map(R.prop('calories')),
		R.sum
	)(model.meals)
	const row = tr({className: `text-center font-semibold bg-green-200`}, [
		td({className: `${border}`}, 'Total:'),
		td({className: `${border}`}, caloriesSum),
		td()
	])
	return [...rows, row]
})
const tableBody = (dispatch, model) => R.pipe(tBodyRow(dispatch), tBody)(model)

export default function tableView(dispatch, model) {
	return table({ className: `w-100 ${border} shadow-lg` }, [
		tableHead(["Meal", "Calories", ""]),
		tableBody(dispatch, model),
	])
}
