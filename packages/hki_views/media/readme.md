# Media Monitoring View for HKI
## Version 0.1











## Setup Guide

### List all installed Packages and Activities

1. Connect to ADB Shell 

    adb -s 1.2.3.4:5555 shell

2. Type in the following command to list all packages and their associated files. 

        pm list packages

3. To filter the output based on the package name

        pm list packages | grep com.amazon.amazonvideo.livingroom.nvidia

4. To find all activities published by a package, use the following command & replace com.symbol.wfc.voice by the name of the package to process.

        dumpsys package | grep -Eo "^[[:space:]]+[0-9a-f]+[[:space:]]+com.nvidia.bbciplayer.launch/[^[:space:]]+" | grep -oE "[^[:space:]]+$"


### List installed Packages and Activities

        pm list packages | sed -e "s/package://" | while read x; do cmd package resolve-activity --brief $x | tail -n 1 | grep -v "No activity found"; done 

</br> Output

    com.plexapp.android/com.plexapp.plex.activities.SplashActivity
    android/com.android.internal.app.ResolverActivity
    com.nvidia.tegrazone3/com.nvidia.tegrazone.MainActivity
    com.android.documentsui/.LauncherActivity
    com.nest.android/com.obsidian.v4.activity.LoginActivity
    com.silicondust.view/.App
    com.plexapp.mediaserver.smb/com.plexapp.mediaserver.ui.main.MainActivity
    com.android.vending/com.google.android.finsky.tvmainactivity.TvMainActivity
    nextapp.fx/.ui.ExplorerActivity
    com.onemainstream.skynews.android/.common.splash.SplashActivity
    com.google.android.tv/com.android.tv.TvActivity
    com.nvidia.inputviewer/.AccessorySelectionActivity
    com.android.gallery3d/.app.GalleryActivity
    com.nvidia.ota/.ui.LauncherActivity
    com.ubnt.unifi.protect/com.ubnt.sections.splash.SplashActivity
    com.google.android.youtube.tv/com.google.android.apps.youtube.tv.activity.ShellActivity
    com.google.android.tv.remote.service/.settings.SettingsActivity
    com.valvesoftware.steamlink/.SteamShellActivity
    com.netflix.ninja/.MainActivity




## Discovered App Activities


#### BBC iPlayer

    com.nvidia.bbciplayer/.MainPlayerActivity
    com.nvidia.bbciplayer/.DeepLinkActivity
    com.nvidia.bbciplayer/.MainNewsActivity
    com.nvidia.bbciplayer/.MainPlayerActivity
    com.nvidia.bbciplayer/.BaseWebViewActivity
    com.nvidia.bbciplayer/.MainPlayerActivity
    com.nvidia.bbciplayer/.CatalTestActivity
    com.nvidia.bbciplayer/.MainSportActivity
    com.nvidia.bbciplayer/.Channels.InitializeChannelsReceiver
    com.nvidia.bbciplayer/.Channels.InitializeChannelsReceiver
    com.nvidia.bbciplayer/.Channels.InitializeChannelsReceiver
    com.nvidia.bbciplayer/.Channels.InitializeChannelsReceiver
    com.nvidia.bbciplayer/.Channels.InitializeChannelsReceiver


#### BBC News

    com.nvidia.bbciplayer.launch/com.nvidia.bbciplayer.LaunchNewsActivity

#### BBC Sport

    com.nvidia.bbciplayer.launchsport/com.nvidia.bbciplayer.LaunchSportActivity

#### HD Home Run    
    
    com.silicondust.view/.App

#### GeForce Now

    com.nvidia.tegrazone3/com.nvidia.tegrazone.MainActivity

#### ITV Player

    air.ITVMobilePlayer/com.itv.tenft.itvhub.RecommendationActivity
    air.ITVMobilePlayer/com.itv.tenft.itvhub.MainActivity
    air.ITVMobilePlayer/com.itv.tenft.itvhub.WatchNextActivity
    air.ITVMobilePlayer/com.itv.tenft.itvhub.MainActivity
    air.ITVMobilePlayer/com.itv.tenft.itvhub.GlobalSearchActivity
    air.ITVMobilePlayer/com.itv.tenft.itvhub.MainActivity
    air.ITVMobilePlayer/com.itv.tenft.itvhub.receiver.UpdateCatalogueReceiver
    air.ITVMobilePlayer/com.itv.tenft.itvhub.receiver.UpdateCatalogueReceiver

#### Leanback Launcher

    com.google.android.tvlauncher/.MainActivity

    com.google.android.tvlauncher/.appsview.RemoveAppLinkActivity
    com.google.android.tvlauncher/.settings.OpenSourceActivity
    com.google.android.tvlauncher/.appsview.AddAppLinkActivity
    com.google.android.tvlauncher/.inputs.InputsPanelActivity
    com.google.android.tvlauncher/.appsview.AppsViewActivity
    com.google.android.tvlauncher/.settings.HomeScreenSettingsActivity
    com.google.android.tvlauncher/.settings.HomeScreenSettingsActivity
    com.google.android.tvlauncher/.notifications.NotificationsSidePanelActivity
    com.google.android.tvlauncher/.appsview.data.MarketUpdateReceiver

#### Nest
    com.nest.android/net.openid.appauth.RedirectUriReceiverActivity
    com.nest.android/com.nestlabs.android.framework.deeplink.DeepLinkRoutingActivity
    com.nest.android/com.obsidian.v4.activity.LoginActivity
    com.nest.android/com.nestlabs.android.framework.deeplink.DeepLinkRoutingActivity
    com.nest.android/com.obsidian.v4.activity.LoginActivity
    com.nest.android/com.obsidian.v4.tv.home.TvHomeActivity
    com.nest.android/com.obsidian.v4.goose.RegisterGeofencesWithOSBroadcastReceiver
    com.nest.android/com.obsidian.v4.goose.healthcheck.GeofenceHealthChangeBroadcastReceiver
    com.nest.android/com.obsidian.v4.goose.reporting.ReportGeofenceTransitionBroadcastReceiver
    com.nest.android/com.google.android.gms.measurement.AppMeasurementInstallReferrerReceiver
    com.nest.android/com.obsidian.v4.goose.healthcheck.GeofenceHealthChangeBroadcastReceiver
    com.nest.android/com.nestlabs.android.notificationdisplay.UpdateNotificationChannelsBroadcastReceiver
    com.nest.android/com.google.firebase.iid.FirebaseInstanceIdReceiver
    com.nest.android/com.nestlabs.android.notificationdisplay.UpdateNotificationChannelsBroadcastReceiver
    com.nest.android/com.obsidian.v4.goose.RegisterGeofencesWithOSBroadcastReceiver
    com.nest.android/com.obsidian.v4.goose.RegisterGeofencesWithOSBroadcastReceiver
    com.nest.android/com.nestlabs.android.notificationdisplay.UpdateNotificationChannelsBroadcastReceiver
    com.nest.android/com.obsidian.v4.goose.RegisterGeofencesWithOSBroadcastReceiver
    com.nest.android/com.google.firebase.messaging.FirebaseMessagingService
    com.nest.android/com.obsidian.v4.gcm.NestFirebaseMessagingService

#### Netflix

    com.netflix.ninja/.MainActivity

#### Plex Media Server

    com.plexapp.android/com.plexapp.plex.activities.SplashActivity    

#### Prime Video

    com.amazon.amazonvideo.livingroom/com.amazon.ignition.IgnitionActivity
    com.amazon.amazonvideo.livingroom/com.amazon.ignition.receiver.RunOnInstallReceiver
    com.amazon.amazonvideo.livingroom/com.amazon.ignition.receiver.LocaleChangeReceiver
    com.amazon.amazonvideo.livingroom/com.amazon.ignition.receiver.TimeChangedReceiver
    com.amazon.amazonvideo.livingroom/com.amazon.ignition.receiver.BootUpReceiver
    com.amazon.amazonvideo.livingroom/com.amazon.ignition.receiver.AppUpdateReceiver

    com.amazon.amazonvideo.livingroom.nvidia/com.amazon.amazonvideo.livingroom.migrator.FileMigrationService

#### Sky News

    com.onemainstream.skynews.android/.common.splash.SplashActivity

#### Steam

    com.valvesoftware.steamlink/.SteamShellActivity

#### UniFI Protect

    com.ubnt.unifi.protect/com.ubnt.sections.splash.SplashActivity

#### Windscribe VPN

    com.windscribe.vpn/.LaunchVPN
    com.windscribe.vpn/.splash.SplashActivity
    com.windscribe.vpn/.bootreceiver.WindscribeBootReceiver
    com.windscribe.vpn/.bootreceiver.WindscribeBootReceiver
    com.windscribe.vpn/com.google.android.gms.measurement.AppMeasurementInstallReferrerReceiver
    com.windscribe.vpn/com.google.firebase.iid.FirebaseInstanceIdReceiver
    com.windscribe.vpn/.bootreceiver.WindscribeBootReceiver
    com.windscribe.vpn/de.blinkt.openvpn.core.OpenVPNService
    com.windscribe.vpn/.firebasecloud.WindscribeCloudMessaging
    com.windscribe.vpn/com.google.firebase.messaging.FirebaseMessagingService

#### Youtube

    com.google.android.youtube.tv/com.google.android.apps.youtube.tv.activity.ShellActivity














    







