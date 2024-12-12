# import speech_recognition as sr
# import webbrowser
# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.chrome.service import Service
# from webdriver_manager.chrome import ChromeDriverManager
# import time

# recognizer = sr.Recognizer()

# def initialize_browser():
#     try:
#         print("Initializing browser...")
#         driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
#         driver.maximize_window()
#         driver.get("http://localhost:5173")
#         return driver
#     except Exception as e:
#         print(f"Error initializing browser: {e}")
#         return None

# def listen_to_audio():
#     try:
#         with sr.Microphone() as source:
#             print("Listening for your command...")
#             recognizer.adjust_for_ambient_noise(source, duration=1)  # Adjust for 1 second
#             audio = recognizer.listen(source, timeout=5)  # 5 seconds timeout
#         return audio
#     except Exception as e:
#         print(f"Error listening to audio: {e}")
#         return None


# def recognize_audio(audio):
#     if audio is None:
#         return None
#     try:
#         print("Recognizing...")
#         command = recognizer.recognize_google(audio)
#         print(f"Command recognized: {command}")
#         return command.lower()
#     except sr.UnknownValueError:
#         print("Sorry, I couldn't understand that.")
#         return None
#     except sr.RequestError:
#         print("There was an issue with the speech recognition service.")
#         return None

# def process_command(command, driver):
#     if command is None:
#         print("No command detected.")
#         return

#     print(f"Processing command: {command}")
#     try:
#         if "open browser" in command:
#             print("Opening browser...")
#             driver.get("http://localhost:5173/User/PWD")  # Replace with your desired URL

#         elif "open test" in command:
#             print("Opening test webpage...")
#             driver.get("http://localhost:5173/User/PWD/Test")  # Replace with your specific test URL
#         elif "open test two" or "open test 2" in command:
#             print("Opening test webpage...")
#             driver.get("http://localhost:5173/User/PWD/Test/questionpaper")  # Replace with your specific test URL

#         elif "scroll down" in command or "scroll" in command:
#             print("Scrolling down the page...")
#             driver.execute_script("window.scrollBy(0, 500);")  # Scroll down by 500 pixels

#         elif "scroll up" in command:
#             print("Scrolling up the page...")
#             driver.execute_script("window.scrollBy(0, -500);")  # Scroll up by 500 pixels

#         elif "next page" in command:
#             print("Going to the next page...")
#             driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.CONTROL + Keys.RIGHT)  # Simulates page navigation

#         elif "previous page" in command:
#             print("Going to the previous page...")
#             driver.find_element(By.TAG_NAME, 'body').send_keys(Keys.CONTROL + Keys.LEFT)  # Simulates backward navigation

#         elif "exit" in command:
#             print("Exiting...")
#             driver.quit()

#         else:
#             print("Command not recognized. Please try again.")
#     except Exception as e:
#         print(f"Error processing command: {e}")
# def main():
    
#     driver = initialize_browser()  # Initialize the browser
#     if driver is None:
#         return

#     try:
#         while True:
#             print("\nReady to listen...")
#             audio = listen_to_audio()  # Listen to audio input
#             command = recognize_audio(audio)  # Recognize the audio command
#             process_command(command, driver)  # Process the recognized command
#             if command and "exit" in command:
#                 print("Exiting the program.")
#                 break
#     except KeyboardInterrupt:
#         print("\nProgram interrupted by user.")
#     finally:
#         driver.quit()

# if __name__ == "__main__":
#     main()

import speech_recognition as sr
import webbrowser
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time
import re

recognizer = sr.Recognizer()

def initialize_browser():
    try:
        print("Initializing browser...")
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))
        driver.maximize_window()
        driver.get("http://localhost:5173")
        return driver
    except Exception as e:
        print(f"Error initializing browser: {e}")
        return None

def listen_to_audio():
    try:
        with sr.Microphone() as source:
            print("Listening for your command...")
            recognizer.adjust_for_ambient_noise(source, duration=1)  # Adjust for 1 second
            audio = recognizer.listen(source, timeout=5)  # 5 seconds timeout
        return audio
    except Exception as e:
        print(f"Error listening to audio: {e}")
        return None

def recognize_audio(audio):
    if audio is None:
        return None
    try:
        print("Recognizing...")
        command = recognizer.recognize_google(audio)
        print(f"Command recognized: {command}")
        return command.lower()
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand that.")
        return None
    except sr.RequestError:
        print("There was an issue with the speech recognition service.")
        return None

def process_command(command, driver):
    if command is None:
        print("No command detected.")
        return

    print(f"Processing command: {command}")
    try:
        # Navigation to different pages
        if "open browser" in command:
            print("Opening browser...")
            driver.get("http://localhost:5173/User/PWD")

        elif "open test list" in command or "open tests" in command:
            print("Opening test list...")
            driver.get("http://localhost:5173/User/PWD/Test")

        # Test selection with voice commands
        elif "open test" in command or "select test" in command:
            # Extract test number if mentioned
            test_number_match = re.search(r'test (\d+)', command)
            if test_number_match:
                test_number = int(test_number_match.group(1))
                select_test_by_number(driver, test_number)
            else:
                print("Please specify a test number")

        # Question paper navigation
        elif "scroll down" in command or "scroll" in command:
            print("Scrolling down the page...")
            driver.execute_script("window.scrollBy(0, 500);")

        elif "scroll up" in command:
            print("Scrolling up the page...")
            driver.execute_script("window.scrollBy(0, -500);")

        # Question navigation
        elif "go to question" in command or "scroll to question" in command:
            question_match = re.search(r'question (\d+)', command)
            if question_match:
                question_number = int(question_match.group(1))
                scroll_to_question(driver, question_number)
            else:
                print("Please specify a question number")

        # Answer input for different question types
        elif "answer question" in command:
            question_match = re.search(r'question (\d+)', command)
            if question_match:
                question_number = int(question_match.group(1))
                answer_input = extract_answer_from_command(command)
                fill_answer(driver, question_number, answer_input)
            else:
                print("Please specify a question number and answer")

        elif "submit test" in command or "submit answers" in command:
            submit_test(driver)

        elif "exit" in command:
            print("Exiting...")
            driver.quit()

        else:
            print("Command not recognized. Please try again.")
    except Exception as e:
        print(f"Error processing command: {e}")

def select_test_by_number(driver, test_number):
    try:
        # Use data-test-index attribute for more reliable selection
        test_list = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "li[data-test-index]"))
        )
        
        # Select test by index
        if 0 < test_number <= len(test_list):
            test_list[test_number - 1].click()
            print(f"Selected test number {test_number}")
            
            # Wait for navigation to complete
            WebDriverWait(driver, 10).until(
                EC.url_contains("/questionpaper")
            )
        else:
            print(f"Invalid test number. Only {len(test_list)} tests available.")
    except Exception as e:
        print(f"Error selecting test: {e}")
        
def scroll_to_question(driver, question_identifier, verbose=True):
    try:
        # Support multiple types of identifiers
        if isinstance(question_identifier, int):
            # If it's an integer, treat it as an index (0-based)
            question = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.XPATH, f"(//div[contains(@class, 'space-y-6')]//div[contains(@class, 'mb-6')])[{question_identifier + 1}]"))
            )
            identifier_type = "index"
        elif isinstance(question_identifier, str):
            # If it's a string, look for different matching strategies
            try:
                # Try exact match with question number
                question = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, f"//div[contains(@class, 'mb-6') and contains(., 'Question {question_identifier}')]"))
                )
                identifier_type = "question number"
            except:
                # Fallback to partial text match
                question = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, f"//div[contains(@class, 'mb-6') and contains(translate(text(), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '{question_identifier.lower()}')]"))
                )
                identifier_type = "text"
        else:
            raise ValueError("Invalid identifier type. Use int or str.")

        # Scroll to the question with more robust scrolling
        driver.execute_script("""
            var element = arguments[0];
            var offset = 100; // Offset to account for fixed headers
            
            // Smooth scroll with offset
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.pageYOffset - offset,
                behavior: 'smooth'
            });
            
            // Optional: Highlight the question temporarily
            element.style.transition = 'background-color 0.5s ease';
            element.style.backgroundColor = 'rgba(0, 123, 255, 0.1)';
            setTimeout(() => {
                element.style.backgroundColor = '';
            }, 1000);
        """, question)

        # Verbose logging
        if verbose:
            print(f"Scrolled to {'question' if identifier_type != 'text' else 'content'} "
                  f"using {identifier_type}: '{question_identifier}'")
            
            # Try to extract and print question text
            try:
                question_text = question.text[:100] + '...' if len(question.text) > 100 else question.text
                print(f"Question preview: {question_text}")
            except:
                pass

        return question

    except Exception as e:
        print(f"Error scrolling: {e}")
        return None

def fill_answer(driver, question_number, answer):
    try:
        # Find the textarea or radio buttons for the specific question
        question = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, f"//div[contains(@class, 'mb-6') and .//span[text()='{question_number}.']"))
        )
        
        # Check if it's a text answer or multiple choice
        textarea = question.find_elements(By.TAG_NAME, 'textarea')
        radio_buttons = question.find_elements(By.TAG_NAME, 'input[type="radio"]')
        
        if textarea:
            # Text answer
            textarea[0].clear()
            textarea[0].send_keys(answer)
            print(f"Filled answer for question {question_number}")
        elif radio_buttons:
            # Multiple choice - find matching option text
            for radio in radio_buttons:
                option_text = radio.find_element(By.XPATH, "./following-sibling::span").text
                if answer.lower() in option_text.lower():
                    radio.click()
                    print(f"Selected option for question {question_number}")
                    break
    except Exception as e:
        print(f"Error filling answer: {e}")

def extract_answer_from_command(command):
    # Extract answer text after "answer question X"
    answer_match = re.search(r'answer question \d+ (.+)', command)
    return answer_match.group(1) if answer_match else None

def submit_test(driver):
    try:
        # Find and click submit button
        submit_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "button.bg-blue-400"))
        )
        submit_button.click()
        print("Test submitted successfully")
    except Exception as e:
        print(f"Error submitting test: {e}")

def main():
    driver = initialize_browser()  # Initialize the browser
    if driver is None:
        return

    try:
        while True:
            print("\nReady to listen...")
            audio = listen_to_audio()  # Listen to audio input
            command = recognize_audio(audio)  # Recognize the audio command
            process_command(command, driver)  # Process the recognized command
            if command and "exit" in command:
                print("Exiting the program.")
                break
    except KeyboardInterrupt:
        print("\nProgram interrupted by user.")
    finally:
        driver.quit()

if __name__ == "__main__":
    main()