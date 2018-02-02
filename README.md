#  VS
  * A simple video trimming/sticthing example
  
## Lance's custom code
  * [Components](https://github.com/masseyl/vs/tree/master/App/Components)
  * [Main Container](https://github.com/masseyl/vs/blob/master/App/Containers/EditorsScreen.js)
  * [Redux](https://github.com/masseyl/vs/blob/master/App/Redux/EditorsRedux.js)

### Screenshots (Big files - you'll need to download them)
  * [Selecting videos](https://github.com/masseyl/vs/blob/master/screenshots/1.%20Selecting%20videos.mp4)
  * [Trimming videos](https://github.com/masseyl/vs/blob/master/screenshots/2.%20Trimming%20a%20video.mp4)
  * [Drag-n-Drop](https://github.com/masseyl/vs/blob/master/screenshots/3.%20Drag-n-Drop%20ordering.mp4)
  * [Stitching together the result](https://github.com/masseyl/vs/blob/master/screenshots/4.%20Stitching%20together%20a%20new%20video.mp4)
## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`


## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android - YMMV
    * if running on device use Android SDK 26 
      * make sure ANDROID_HOME path is correct in environment, or add a local.properties file to the android folder and set the 'sdk.dir' value. For example: sdk.dir = /Users/lancemassey/Library/Android/sdk
      * make sure you're using JRE 1.8 
    * if not on device
      * Run Genymotion
    * run `react-native run-android`
    
## :arrow_forward: Usage:

1. After app opens, select videos. _iOS allows multiple selection_
2. Processing takes a while, so wait
3. Click on a thumbnail to see a video
    * _trim beginning and end by dragging the side bars_
    * _when you're happy with the endpoints click "trim"_
    * _click "Done" to go back to the thumbnails_
4. When you're happy with your edits, drag and drop thumbnails into the order you want them stitched together
5. Click the big red button
6. Wait
7. Keep waiting
8. Your newly edited video should show up in the player as well as the CameraRoll

## :arrow_forward: Libraries used:
  * For video trimming, and thumbnails
    * [React Native Video Processing](https://github.com/shahen94/react-native-video-processing)
  * For video stitching
    * [React Native Video Editor](https://github.com/mostwantit/react-native-video-editor)
* For video selection
    * [React Native Image Crop Picker](https://github.com/ivpusic/react-native-image-crop-picker)
* For drag and drop
    * [React Native Sortable Grid](https://github.com/ollija/react-native-sortable-grid)
* BoilerPlate
    * [Ignite](https://github.com/infinitered/ignite)
    
