from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from sklearn.linear_model import LinearRegression
import pandas as pd

# Load the data
data = pd.read_csv("D:\starbucks.csv")

@api_view(['POST'])
def submit_inputs(request):
    # Get input values from the request data
    total_fat = request.data.get('totalFat')  # Renamed from input1
    sodium = request.data.get('sodium')      # Renamed from input2
    sugar = request.data.get('sugar')        # Renamed from input3
    protein = request.data.get('protein')    # Renamed from input4

    # Check if any input value is missing
    if None in (total_fat, sodium, sugar, protein):
        return Response({'error': 'One or more input values are missing'}, status=status.HTTP_400_BAD_REQUEST)

    # Convert input values to float
    try:
        total_fat = float(total_fat)
        sodium = float(sodium)
        sugar = float(sugar)
        protein = float(protein)
    except ValueError:
        return Response({'error': 'One or more input values are not valid numbers'}, status=status.HTTP_400_BAD_REQUEST)

    # Prepare input features (assuming columns 1, 2, 3, and 7 are relevant)
    x = data.iloc[:, [4,7,11,12]]  # Adjust column indices based on your dataset
    y = data.iloc[:, [3]]          # Adjust column index based on your dataset

    # Train a linear regression model
    rg = LinearRegression()
    rg.fit(x, y)

    # Predict the output based on input values
    out = rg.predict([[total_fat, sodium, sugar, protein]])

    # Process the output
    output = f'Calories: {out[0][0]:.2f}'  # Format output to 2 decimal places and include label

    return Response({'output': output})
