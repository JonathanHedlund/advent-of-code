allCollectedFoodItems = open("input.txt", "r")

bagOfFood = 0
totalForEachElf = []
for foodItem in allCollectedFoodItems:
    if foodItem == "\n":
        totalForEachElf.append(bagOfFood)
        bagOfFood = 0
        continue

    bagOfFood += int(foodItem)

print(max(totalForEachElf))
print(sum(sorted(totalForEachElf)[-4:-1]))
