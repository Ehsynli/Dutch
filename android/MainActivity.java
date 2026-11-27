package com.dutch.salam;

import android.Manifest;
import android.app.Activity;
import android.content.ClipData;
import android.content.ClipboardManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.browser.customtabs.CustomTabsIntent;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends Activity {
    private static final Uri SITE = Uri.parse("https://dutch-learning.hsynli.chatgpt.site/");
    static final String OPEN_NOTIFICATIONS = "open_notifications";

    @Override
    public void onCreate(Bundle saved) {
        super.onCreate(saved);
        NastyaMessagingService.ensureChannel(this);
        renderLauncher();
        if (saved == null) openFromNotification(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        openFromNotification(intent);
    }

    private void renderLauncher() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        int padding = (int) (24 * getResources().getDisplayMetrics().density);
        root.setPadding(padding, padding, padding, padding);
        getWindow().getDecorView().setOnApplyWindowInsetsListener((view, insets) -> {
            root.setPadding(padding + insets.getSystemWindowInsetLeft(),
                padding + insets.getSystemWindowInsetTop(), padding + insets.getSystemWindowInsetRight(),
                padding + insets.getSystemWindowInsetBottom());
            return insets;
        });
        TextView title = new TextView(this);
        title.setText("Dutch Learning");
        title.setTextSize(24);
        root.addView(title);
        Button open = new Button(this);
        open.setText("Dutch Learning-i aç");
        open.setOnClickListener(view -> openPage(SITE));
        root.addView(open);
        Button notifications = new Button(this);
        notifications.setText("Bildirişlərə icazə ver");
        notifications.setOnClickListener(view -> enableNotifications());
        root.addView(notifications);
        Button token = new Button(this);
        token.setText("Sınaq tokenini kopyala");
        root.addView(token);
        TextView status = new TextView(this);
        root.addView(status);
        token.setOnClickListener(view -> {
            token.setEnabled(false);
            FirebaseMessaging.getInstance().getToken().addOnCompleteListener(this, task -> {
                token.setEnabled(true);
                if (!task.isSuccessful()) {
                    status.setText("Firebase tokeni alınmadı. İnternet bağlantısını yoxla.");
                    return;
                }
                ClipboardManager clipboard = getSystemService(ClipboardManager.class);
                if (clipboard != null) clipboard.setPrimaryClip(ClipData.newPlainText("FCM test token", task.getResult()));
                status.setText("Sınaq tokeni kopyalandı.");
            });
        });
        setContentView(root);
        root.requestApplyInsets();
    }

    private void enableNotifications() {
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 100);
        } else {
            startActivity(new Intent(android.provider.Settings.ACTION_APP_NOTIFICATION_SETTINGS)
                .putExtra(android.provider.Settings.EXTRA_APP_PACKAGE, getPackageName()));
        }
    }

    private void openFromNotification(Intent intent) {
        if (intent != null && (intent.getBooleanExtra(OPEN_NOTIFICATIONS, false) ||
            intent.hasExtra("google.message_id") || intent.hasExtra("gcm.message_id"))) {
            openPage(SITE.buildUpon().fragment("notifications").build());
        }
    }

    private void openPage(Uri url) {
        new CustomTabsIntent.Builder().setShowTitle(true).build().launchUrl(this, url);
    }
}
