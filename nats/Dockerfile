# Use the official NATS Streaming image as base
FROM nats-streaming:0.17.0

# Set environment variables
ENV NATS_PORT=4222
ENV MONITORING_PORT=8222
ENV HB_INTERVAL=5
ENV HB_TIMEOUT=5s
ENV MAX_CONNS=2
ENV SUBSCRIPTIONS_DUMP=true
ENV CLIENT_ID=ticketing

# Expose ports
EXPOSE $NATS_PORT $MONITORING_PORT

# Start NATS Streaming server
CMD ["nats-streaming-server", "-p", "$NATS_PORT", "-m", "$MONITORING_PORT", "-hbi", "$HB_INTERVAL", "-hbt", "$HB_TIMEOUT", "-SD", "-cid", "$CLIENT_ID"]
