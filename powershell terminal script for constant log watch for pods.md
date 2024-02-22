#powershell script to watch logs from #different app events and jobs

$namespace = "default"
$appLabels = @("tickets", "orders", "expiration", "payments") # List of app labels

foreach ($app in $appLabels) {
    # Get the pod name for the app
    $podName = kubectl get pods -n $namespace -l app=$app -o jsonpath='{.items[0].metadata.name}'

    if ($podName) {
        Write-Host "Logs for $podName from app $app"
        # Fetch and print the logs for the pod
        kubectl logs -n $namespace $podName
    } else {
        Write-Host "No pod found for app $app in namespace $namespace"
    }
}


