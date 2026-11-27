package com.dutch.salam;

import android.Manifest;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class NastyaMessagingService extends FirebaseMessagingService {
    private static final String CHANNEL = "nastya_reminders";

    static void ensureChannel(Context context) {
        if (Build.VERSION.SDK_INT >= 26) {
            NotificationManager manager = context.getSystemService(NotificationManager.class);
            if (manager != null) manager.createNotificationChannel(
                new NotificationChannel(CHANNEL, "Nastya", NotificationManager.IMPORTANCE_HIGH));
        }
    }

    @Override
    public void onMessageReceived(RemoteMessage message) {
        if (Build.VERSION.SDK_INT >= 33 &&
            checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) return;
        RemoteMessage.Notification notification = message.getNotification();
        String body = notification == null ? message.getData().get("body") : notification.getBody();
        if (body == null || body.isEmpty()) return;
        String title = notification == null ? message.getData().get("title") : notification.getTitle();
        ensureChannel(this);
        Intent open = new Intent(this, MainActivity.class)
            .putExtra(MainActivity.OPEN_NOTIFICATIONS, true)
            .addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        PendingIntent action = PendingIntent.getActivity(this, 0, open,
            PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        Notification.Builder builder = Build.VERSION.SDK_INT >= 26
            ? new Notification.Builder(this, CHANNEL) : new Notification.Builder(this);
        NotificationManager manager = getSystemService(NotificationManager.class);
        if (manager != null) manager.notify((int) System.nanoTime(), builder
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title == null ? "Nastya" : title)
            .setContentText(body).setStyle(new Notification.BigTextStyle().bigText(body))
            .setContentIntent(action).setAutoCancel(true).build());
    }
}
