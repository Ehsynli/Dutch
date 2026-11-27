package com.dutch.salam;

import android.Manifest;
import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.print.PrintAttributes;
import android.print.PrintManager;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends Activity {
    private static final String APP_PAGE = "file:///android_asset/index.html";
    static final String OPEN_NOTIFICATIONS = "open_notifications";
    private WebView web;

    @Override
    @SuppressWarnings("deprecation")
    public void onCreate(Bundle saved) {
        super.onCreate(saved);
        NastyaMessagingService.ensureChannel(this);
        web = new WebView(this);
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setDomStorageEnabled(true);
        web.getSettings().setAllowFileAccess(false);
        web.getSettings().setAllowContentAccess(false);
        web.addJavascriptInterface(new AppControls(), "AndroidReading");
        web.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                String target = request.getUrl().toString();
                return !target.equals(APP_PAGE) && !target.startsWith(APP_PAGE + "#");
            }
        });
        View root = getWindow().getDecorView();
        root.setOnApplyWindowInsetsListener((view, insets) -> {
            web.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(),
                insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            return insets;
        });
        setContentView(web);
        root.requestApplyInsets();
        if (saved == null || web.restoreState(saved) == null) {
            web.loadUrl(APP_PAGE + (isNotification(getIntent()) ? "#notifications" : ""));
        }
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        if (isNotification(intent)) web.loadUrl(APP_PAGE + "#notifications");
    }

    @Override
    protected void onSaveInstanceState(Bundle state) {
        super.onSaveInstanceState(state);
        web.saveState(state);
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }

    private boolean isNotification(Intent intent) {
        return intent != null && (intent.getBooleanExtra(OPEN_NOTIFICATIONS, false) ||
            intent.hasExtra("google.message_id") || intent.hasExtra("gcm.message_id"));
    }

    private void enableNotifications() {
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 100);
        } else if (Build.VERSION.SDK_INT >= 26) {
            startActivity(new Intent(android.provider.Settings.ACTION_APP_NOTIFICATION_SETTINGS)
                .putExtra(android.provider.Settings.EXTRA_APP_PACKAGE, getPackageName()));
        }
    }

    public final class AppControls {
        @JavascriptInterface
        public void enablePush() {
            runOnUiThread(MainActivity.this::enableNotifications);
        }

        @JavascriptInterface
        public void copyPushToken() {
            runOnUiThread(() -> FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(MainActivity.this, task -> {
                    if (!task.isSuccessful()) {
                        Toast.makeText(MainActivity.this, "Firebase tokeni alınmadı.", Toast.LENGTH_LONG).show();
                        return;
                    }
                    ClipboardManager clipboard = getSystemService(ClipboardManager.class);
                    if (clipboard != null) clipboard.setPrimaryClip(
                        ClipData.newPlainText("FCM test token", task.getResult()));
                    Toast.makeText(MainActivity.this, "Sınaq tokeni kopyalandı.", Toast.LENGTH_SHORT).show();
                }));
        }

        @JavascriptInterface
        public void print() {
            runOnUiThread(() -> {
                PrintManager manager = getSystemService(PrintManager.class);
                if (manager == null) return;
                manager.print("Dutch Learning", web.createPrintDocumentAdapter("Dutch Learning"),
                    new PrintAttributes.Builder().setMediaSize(PrintAttributes.MediaSize.ISO_A4).build());
            });
        }
    }
}
