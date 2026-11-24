# Vocab Android wrapper

This project wraps the supplied built website files in a Capacitor Android WebView.

## Build an APK using GitHub Actions (no PC required)

1. Create a GitHub account and a new **public or private** repository.
2. Upload the contents of this ZIP to the repository root (not the ZIP file itself).
3. Open the repository's **Actions** tab.
4. Select **Build Vocab Android APK** on the left.
5. Press **Run workflow** and confirm.
6. Wait for the workflow to finish successfully.
7. Open the completed workflow run, scroll to **Artifacts**, and download `Vocab-debug-apk`.
8. Extract the downloaded artifact ZIP. It contains `app-debug.apk`.
9. Transfer/install the APK on Android. Android may ask you to allow installation from that file manager/browser.

This is a debug APK for testing and direct sharing. It is not a Google Play release-signed APK.
The app ID is `com.vocab.prep`. Keep it unchanged for future updates to this same app.

The app uses the Android System WebView to render the bundled web files. It does not open Chrome as a separate browser app.

Note: this packages the built site exactly as supplied. It does not restore original editable React source files. Test login, storage, offline behavior, and all app features on a real device before distributing widely.
