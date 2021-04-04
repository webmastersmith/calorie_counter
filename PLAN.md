# Calorie Counting App Notes

## Data Model
```javascript
meal = {
	id: 1,
	description: "Breakfast",
	calories: 460,
}

model = {
	meals: [],
	showForm: true,
	description: "Breakfast",
	calories: 460,
	editId: 3,
	nextId: 1, // next time meal added, this will be the next id.
}
```

## View Functions
formView
formSet
	meal
	calories
	buttonSet
tableView
	tableHeader
	mealsBody
	mealRow
		cell
	tableTotal


## Controller / Update
## ways to interact with app.
click addMeal button
meal input
calorie input
click save 
	add meal
	update meal
click edit
click delete icon
