

# import speech_recognition as sr
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.keys import Keys
# import time

# # Initialize recognizer
# recognizer = sr.Recognizer()

# # Set up Selenium WebDriver
# driver_path = r"c:/Program Files/Google/Chrome/Application/chrome.exe"  # Update to the correct path of your ChromeDriver
# service = Service(driver_path)
# driver = webdriver.Chrome(service=service)

# def listen_to_audio():
#     with sr.Microphone() as source:
#         print("Listening for your command...")
#         recognizer.adjust_for_ambient_noise(source)  # To ignore ambient noise
#         audio = recognizer.listen(source)
#     return audio

# def recognize_audio(audio):
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

# def process_command(command):
#     if command is None:
#         print("No command detected.")
#         return
    
#     print(f"Processing command: {command}")

#     # Open the browser and navigate to the localhost server
#     if "open browser" in command:
#         print("Opening localhost...")
#         driver.get("http://localhost:3000/")  # Opens localhost or your desired local URL

#     # Scroll the page down
#     elif "scroll down" in command:
#         print("Scrolling the page down...")
#         driver.execute_script("window.scrollBy(0, 500)")  # Scrolls the page by 500px down

#     # Go to the next page (or reload the page if no history is available)
#     elif "next page" in command:
#         print("Opening next page...")
#         driver.execute_script("window.history.go(1)")  # Goes to the next page in history (next page)

#     # Scroll up the page (if needed)
#     elif "scroll up" in command:
#         print("Scrolling the page up...")
#         driver.execute_script("window.scrollBy(0, -500)")  # Scrolls the page by 500px up

#     else:
#         print("Command not recognized. Please try again.")

# def main():
#     while True:
#         audio = listen_to_audio()  # Listen to audio input
#         command = recognize_audio(audio)  # Recognize the audio command
#         process_command(command)  # Process the recognized command
#         time.sleep(1)  # Small delay to avoid overloading

# if __name__ == "__main__":
#     main()

import speech_recognition as sr
import webbrowser


recognizer = sr.Recognizer()

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

def process_command(command):
    if command is None:
        print("No command detected.")
        return
    
    print(f"Processing command: {command}")
    try:
         
    # Open the browser and navigate to the localhost server
        if "open browser" in command:
            print("Opening browser...")
            webbrowser.open("http://localhost:5173")  # Opens localhost or your desired local URL

    # Open the specific test page in the local server
        elif "open test" in command:
            print("Opening test webpage...")
        # webbrowser.open("http://localhost:8000/testpage")  # Replace with your local test URL

    # Scroll the page down
        elif "scroll" in command:
           print("Scrolling the page...")
           print("This functionality is not supported without a browser driver.")

    # Go to the next page (or reload the page if no history is available)
        elif "next page" in command:
           print("Opening next page...")
           print("This functionality is not supported without a browser driver.")

    # Scroll up the page (if needed)
        elif "scroll up" in command:
           print("Scrolling the page up...")
           print("This functionality is not supported without a browser driver.")

        else:
            print("Command not recognized. Please try again.")
    except Exception as e:
        print(f"Error processing command: {e}")
def main():
    while True:
        try:
            print("\nReady to listen...")
            audio = listen_to_audio()  # Listen to audio input
            command = recognize_audio(audio)  # Recognize the audio command
            process_command(command)  # Process the recognized command
            if command and "exit" in command:
                print("Exiting the program.")
                break
        
        except KeyboardInterrupt:
            print("\nProgram interrupted by user.")
            break
if __name__ == "__main__":
    main()