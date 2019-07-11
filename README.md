# Custom Ionic Starter App

A simple application based on Ionic Framework blank template. It's aiming to create reusable components.

## Camera plugin Setup

```
ionic cordova plugin add cordova-plugin-camera  
npm install @ionic-native/camera
```

## Android build

After connecting your device, and enabling developer options and USB debugging, run:  
```
ionic cordova run android
```

or run:  
```
ionic cordova build android
```
and find the generated apk file under ```platforms\android\app\build\outputs\apk\debug\app-debug.apk```
