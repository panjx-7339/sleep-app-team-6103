# 1. About DreamCat

Getting a consistent and sufficient amount of sleep is vital to maintaining a healthy lifestyle, so it is important for individuals to be aware of their sleeping habits to make conscious efforts to improve them.

This app is targeted at users who would like to maintain a healthy sleep schedule and have tried to track their sleep but lack the motivation to maintain the habit. Despite tracking their sleep hours, some struggle to make active changes to their sleep habits. As building up the habit of tracking and maintaining one’s sleep hours requires time and commitment, we hope to gamify this process by creating a sleep tracking app that gives users in-game rewards for tracking and getting sufficient amounts of sleep. Users would have more motivation to build this habit and maintain it in the long run.

Similar to a normal sleep tracking app, users can track their sleep hours and view their data. The main feature of the app is a virtual animal whose appearance would change to reflect the number of hours of sleep that the user had the previous night. In addition, sleeping more and consistently tracking sleep hours would give the user reward points which they can use to purchase in-game collectables for the animal.

Download for Android Devices: [https://drive.google.com/file/d/18y52gcrEL2kRUAs34ZxWhXnjbTX4CZQc/view?usp=drive_link](https://drive.google.com/file/d/18y52gcrEL2kRUAs34ZxWhXnjbTX4CZQc/view?usp=drive_link)

Download for IOS Simulator: [https://drive.google.com/file/d/1Wp-AJdaBLf7UuBk5kOPgd4uH9d0j-CBo/view?usp=sharing](https://drive.google.com/file/d/1Wp-AJdaBLf7UuBk5kOPgd4uH9d0j-CBo/view?usp=sharing)

Instructions:
For Android, download the build from google drive. Alternatively, download it using this QR code.
For iOS, download the build on your computer. Drag the file onto an open iOS simulator.

# 2. Features

## 2.1 User Authentication 

**Description of Feature**
Users can create an account using their email and password, where details about their sleep sessions will be stored. Users will see the Login Screen when first opening the app. If users do not yet have an account, they can create an account on the Registration screen using an email and password. They are able to navigate between the Registration and Login Screens using the text below the “Login” and “Register” buttons. Upon successful logging in or creation of an account, users will be redirected to the Home Screen

**Implementation Philosophy**
Firebase Authentication is used to handle the user authentication process. When the user creates an account or logs into an existing account, the functions createUserWithEmailAndPassword and signInWithEmailAndPassword are called.

Additionally, creating an account adds a document to the “users” collection of the Firestore database, each user document having fields for the user’s email and user ID. This document will store other information about the user as they continue to use the app, such as the user’s sleep goal and sleep sessions.

## 2.2 Sleep Tracking 

Users can track sleep sessions in two ways. Firstly, they can start and stop sessions from the home screen, with the recorded start and stop time of the session being the moment the start or stop button was pressed. Secondly, if they did not manage to record the sleep session when it occurred, users can manually input sleep sessions from the Past Sessions screen. Users can also view a list of their past sleep sessions on the Past Sessions screen.

### 2.2.1 Starting and stopping sessions from home screen 

**Description of Feature**
To track a sleep session from the Home Screen, users can press the play button to start it, and the stopwatch will begin. The play button will change to a stop button. To end the sleep session, users can press the stop button. A session will be created.

**Implementation Philosophy**
We used a stopwatch component from react-native-stopwatch-timer package. A few variables, such as isRunning, startTime and endTime are used to track whether the stopwatch is running, the start time, and the end time. isRunning allows us to determine whether the stopwatch should be playing, while startTime and endTime store the values for us to create a session upon the stopping of a sleep session.

The field isSleeping is created in the user document, and is toggled whenever the start or stop button is pressed. This field is used to determine the appearance of the virtual cat, detailed further in part 2.5.

### 2.2.2 Manually inputting sleep sessions

**Description of Feature**
Sometimes, users might forget to use the start and stop button and wish to manually input a session. They can do this from the Past Sessions Screen, by specifying the start and end date in the input box.

The input is validated before a sleep session is created. A sleep session must be at least 0 minutes long (i.e. start time cannot be after end time). A sleep session also has a maximum duration of 24 hours. If either of these conditions are violated, an alert will be shown.

**Implementation Philosophy**
DateTimePickers from @react-native-community/datetimepicker were used to allow users to select the date and times. These values are added to the database when the user presses the plus symbol.

If the “sessions” collection in the user document does not yet exist, it would be created. A session document is created in the “sessions” collection, containing fields for the duration of the sleep session, the start and end times, whether or not the user had met their goal, and the number of points the user earned from that sleep session. The number of points earned by the sleep session is added to the users points, a field in the user document.

### 2.2.3 Viewing Past Sleep Sessions

**Description of Feature**
On the Past Sessions Screen, below the input box, users can view a scrollable list of past sessions showing the start and end times of sleep sessions, along with the duration of the sleep session. Users can delete a session by pressing on the ‘bin’ icon beside the session details.

**Implementation Philosophy**
Sessions are retrieved from the “sessions” collection of the user document in the Firestore Database. Using the map function, Session components are created to display the start, end and duration of sleep sessions. The sessions are sorted in descending order of end time, so that the user will see the most recent session at the top of the list.

A SnapshotListener is used to detect changes in the Database. Upon the adding of a new session, the ScrollView will be immediately updated with the new session.

## 2.3 Viewing Statistics 

Users can view some statistics about their sleep session on the Stats Screen, such as average sleeping hours, a graph, and an analysis of which days they are most likely to miss their sleep goal.

### 2.3.1 Viewing General Statistics

**Description of Feature**
At the top of the Stats Screen, users can view the average hours slept for the past 7 days, past 30 days and all time.

**Implementation Philosophy**
The Stats screen reads sessions from the “sessions” collection in the user document and passes it into the BasicStats component as a prop. Within the BasicStats component, the total sleep hours of sessions ending in each day are calculated and the average is found for the past 7 days, 30 days and all time. If there are no sleep sessions recorded in a day, the values for that day are not considered.

### 2.3.2 Viewing Sleep Data as Graphs

**Description of Feature**
Users can see a bar chart showing the number of hours slept each day. To change the number of days in the graph, users can choose from a dropdown list of time periods (Last 7 Days and Last 30 Days)

**Implementation Philosophy**
A BarChart from react-native-chart-kit is used to create the bar chart, and a Dropdown from react-native-element-dropdown is used to create the dropdown list. Similarly to how the averages are found, the sessions are passed as a prop into the Graph component and processed into an array of pastDays by summing up all sessions that end in that day. The data is then used to create the graph.

### 2.3.3 Prediction of Failure in Meeting Goal 

**Description of Feature**
This feature requires the user to have tracked sleep sessions for at least 7 days. If they have not done so, the message “Track more than 7 days to see when you are most likely to miss your sleep goal." would be shown instead.

**Implementation Philosophy**
Similarly to how sessions are processed for the other statistics features, sessions are passed as a prop into the component. Two arrays, daysSuccessCount and daysTotalCount are used to count the number of days tracked and success days for each day of the week. The two arrays are used to create a new array, daySuccessRate. This array is sorted by success rate, and the 3 days with lowest success rate are returned.

## 2.4 Goal Setting 

**Description of Feature**
From the home screen, users can set a goal for the number of hours they wish to sleep by pressing the “Today’s Goal” button. The goal must not be less than 5 hours, to encourage sufficient hours of sleep, nor exceed 24 hours. By default, the sleep goal is set as 8 hours.

Success or failure to meet their sleep goal will determine the health of their virtual cat, motivating users to commit to their goals.

**Implementation Philosophy**
The sleep goal is stored as a field (“sleepGoal”) in each user document in the “users” collection of Firestore. Upon registration of a new account, sleepGoal is set to 8 hours.

Upon setting a new valid sleep goal, sleepGoal is updated with the new user input. A SnapshotListener constantly checks for the sleepGoal field in Firestore, which ensures that the sleep goal in the app is updated in real time.

## 2.5 Virtual Cat 

**Description of Feature**
The virtual cat will be in the centre of the home screen and its appearance varies between 3 states depending on whether the user had hit their sleep goal the night before

1. Energised - If the user had hit their sleep goal the night before, the cat will appear awake and energised.
2. Tired - If the user had not hit their sleep goal the night before, the cat will appear tired and grumpy.
3. Sleeping - If a sleep session is in progress, the cat will be asleep.

**Implementation Philosophy**
The sum of sleep sessions from the past 2 days are calculated. If the user had met their sleep goal in the past 2 days, the cat would appear energised. Otherwise, it would appear tired.

The field isSleeping in the user document, determined by whether a sleep session is currently in progress, is used to determine if the cat is in the sleeping state.

## 2.6 Reward Points

**Description of Feature**
To motivate users to track their sleep, 5 points will be given for each sleep session tracked that is 3 minutes or longer. Sleep sessions below 3 minutes will receive 0 points to discourage spamming of sessions. In addition, to further motivate users to hit their sleep goal, 10 additional points would be given if the sleep session is higher than the goal set by the user.

Points can be used to purchase decorations for their home screen, which will be detailed in the In-game Shop feature.

**Implementation Philosophy**
Each user document has a field for points, which is initialised at 0 when the user is created. During the creation of each session, either from the Home Screen or the Past Sessions screen, a points field is created in each session with the number of points earned from the session (5 or 15). The points are also added to the points field in the user document.

## 2.7 In-game Shop

### 2.7.1 Purchasing Items

**Description of Feature**
When users press the Shop icon on the navigation bar, they will be redirected to a page where they can purchase collectibles, such as cat toys and decorations for the Home Screen. These items are purchased with reward points earned from recording sleep sessions or meeting their sleep goal.

**Implementation Philosophy**
Upon successful account creation, a ‘shop’ collection is created under the ‘users’ collection in Firestore, containing the shop items. Each item document includes the fields: name, points, isBought and isEquipped. When an item is bought or equipped, the corresponding document is updated, and the user’s points are deducted. A listener is employed to update the points display in real-time.

### 2.7.2 Equipping Items

**Description of Feature**
Upon purchasing the items, users will be able to equip items to display them on the home screen, allowing them to personalise their experience of the app. Each item will have their own position on the home screen.

**Implementation philosophy**
For each shop item, the Firestore database is checked for its isEquipped field. If the item is unequipped, an empty picture of the same dimensions is shown on the Home screen. If the item is equipped, the shop item picture is shown instead.

## 2.8 White Noise

**Description of Feature**
Sleep aids are provided for users who face difficulties sleeping, as users can turn on white noise before sleeping. On Android phones, the white noise continues to play in the background i.e. when the app is not active or when the phone is turned off.

**Implementation philosophy**  
The expo-av library is used for loading and playing a local .mp3 file. When the user first plays the white noise, a ‘sound’ object is created by loading the audio file, and the state is updated. When playing the audio again, it is checked if the sound object exists to eliminate the need for the audio file to be loaded again.

Various audio modes were also adjusted for optimising user experience. For example, playsInSilentModeIOS and staysActiveInBackground were set to true, though the latter only works on Android phones. INTERRUPTION_MODE_ANDROID_DO_NOT_MIX and INTERRUPTION_MODE_IOS_DO_NOT_MIX were also specified, ensuring that the white noise does not interfere with audio interruptions, such as from other apps or calls. The white noise can be resumed by pressing on the music icon again after the audio interruption ends.
