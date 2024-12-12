import requests
import random

def fetch_questions(amount=1, difficulty="medium", question_type="multiple", category=None):
    """
    Fetch trivia questions from the Open Trivia Database API.
    
    """
    print("The fn is reaching here 1")
    url = "https://opentdb.com/api.php"
    params = {
        "amount": amount,
        "difficulty": difficulty,
        "type": question_type,
    }
    if category:
        params["category"] = category
    print("The fn is reaching here 2")
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        if data["response_code"] == 0:
            return data["results"]
        else:
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to connect to the API. {e}")
        return None

def get_categories():
    """
    Fetch and return available trivia categories from the API.
    """
    url = "https://opentdb.com/api_category.php"
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        return data["trivia_categories"]
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to fetch categories. {e}")
        return []

def display_question(question):
    """
    Display a trivia question and options, and capture the user's response.
    """
    print(f"\n{question['question']}")
    options = question['incorrect_answers'] + [question['correct_answer']]
    random.shuffle(options)  # Shuffle options to randomize their order
    for i, option in enumerate(options, start=1):
        print(f"{i}. {option}")

    # Get user input
    while True:
        try:
            user_choice = int(input("Enter the number of your choice: "))
            if 1 <= user_choice <= len(options):
                break
            else:
                print("Invalid choice. Please choose a valid option.")
        except ValueError:
            print("Invalid input. Please enter a number.")

    return options[user_choice - 1] == question['correct_answer']

def adjust_difficulty_based_on_response(current_difficulty, correct_responses, total_responses):
    """
    Adjust the difficulty level based on the percentage of correct responses.
    """
    levels = ["easy", "medium", "hard"]
    correct_percentage = (correct_responses / total_responses) * 100
    current_index = levels.index(current_difficulty)

    if correct_percentage > 70 and current_index < len(levels) - 1:  # Increase difficulty
        return levels[current_index + 1]
    elif correct_percentage < 40 and current_index > 0:  # Decrease difficulty
        return levels[current_index - 1]
    return current_difficulty

def main():
    print("Welcome to the Quiz!")
    
    # User chooses the number of questions
    while True:
        try:
            num_questions = int(input("Enter the number of questions you want to answer: "))
            if num_questions > 0:
                break
            else:
                print("Please enter a positive number.")
        except ValueError:
            print("Invalid input. Please enter a valid number.")

    # User chooses the initial difficulty
    difficulty_levels = ["easy", "medium", "hard"]
    while True:
        initial_difficulty = input("Choose the initial difficulty (easy, medium, hard): ").lower()
        if initial_difficulty in difficulty_levels:
            break
        else:
            print("Invalid difficulty. Please choose from easy, medium, or hard.")

    # User chooses the topic
    categories = get_categories()
    if categories:
        print("\nAvailable Categories:")
        for cat in categories:
            print(f"{cat['id']}. {cat['name']}")
        while True:
            try:
                category_id = int(input("Enter the category ID of your choice (or 0 for any topic): "))
                if category_id == 0 or any(cat["id"] == category_id for cat in categories):
                    break
                else:
                    print("Invalid category ID. Please choose a valid option.")
            except ValueError:
                print("Invalid input. Please enter a number.")
    else:
        print("Could not fetch categories. Defaulting to any topic.")
        category_id = None

    current_difficulty = initial_difficulty
    correct_responses = 0
    total_responses = 0

    for _ in range(num_questions):
        questions = fetch_questions(amount=1, difficulty=current_difficulty, category=category_id)
        if not questions:
            print("Failed to fetch questions. Please try again later.")
            break

        question = questions[0]
        correct = display_question(question)

        if correct:
            print("Correct!")
            correct_responses += 1
        else:
            print(f"Wrong! The correct answer was: {question['correct_answer']}")

        total_responses += 1

        # Adjust difficulty
        current_difficulty = adjust_difficulty_based_on_response(current_difficulty, correct_responses, total_responses)
        print(f"Next question will be {current_difficulty.upper()} level.")

    print("Quiz complete! Thanks for playing!")

if __name__ == "__main__":  # Correct version with double underscores
    main()