from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def fetch_questions(amount=1, difficulty="medium", question_type="multiple", category=None):
    url = "https://opentdb.com/api.php"
    params = {
        "amount": amount,
        "difficulty": difficulty,
        "type": question_type,
    }
    if category:
        params["category"] = category
        
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()

        if data["response_code"] == 0:
            # Process questions to include shuffled options
            processed_questions = []
            for question in data["results"]:
                options = question['incorrect_answers'] + [question['correct_answer']]
                random.shuffle(options)
                processed_question = {
                    'question': question['question'],
                    'options': options,
                    'correct_answer': question['correct_answer'],
                    'difficulty': question['difficulty']
                }
                processed_questions.append(processed_question)
            return processed_questions
        else:
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to connect to the API. {e}")
        return None

def get_categories():
    url = "https://opentdb.com/api_category.php"
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.json()["trivia_categories"]
    except requests.exceptions.RequestException as e:
        print(f"Error: Unable to fetch categories. {e}")
        return []

def adjust_difficulty(current_difficulty, correct_responses, total_responses):
    levels = ["easy", "medium", "hard"]
    correct_percentage = (correct_responses / total_responses) * 100
    current_index = levels.index(current_difficulty)

    if correct_percentage > 70 and current_index < len(levels) - 1:
        return levels[current_index + 1]
    elif correct_percentage < 40 and current_index > 0:
        return levels[current_index - 1]
    return current_difficulty

@app.route('/api/categories', methods=['GET'])
def categories():
    categories = get_categories()
    return jsonify(categories)

@app.route('/api/questions', methods=['POST'])
def get_questions():
    data = request.json
    amount = data.get('amount', 1)
    difficulty = data.get('difficulty', 'medium')
    category = data.get('category')
    
    questions = fetch_questions(amount, difficulty, "multiple", category)
    if questions:
        return jsonify(questions)
    return jsonify({'error': 'Failed to fetch questions'}), 400

@app.route('/api/check-answer', methods=['POST'])
def check_answer():
    data = request.json
    user_answer = data.get('answer')
    correct_answer = data.get('correct_answer')
    current_difficulty = data.get('current_difficulty')
    correct_responses = data.get('correct_responses', 0)
    total_responses = data.get('total_responses', 0)
    
    is_correct = user_answer == correct_answer
    new_difficulty = adjust_difficulty(
        current_difficulty,
        correct_responses + (1 if is_correct else 0),
        total_responses + 1
    )
    
    return jsonify({
        'correct': is_correct,
        'new_difficulty': new_difficulty
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)