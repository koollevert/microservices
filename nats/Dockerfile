# Use an official NATS Streaming Server runtime as a parent image
FROM nats-streaming:0.23.2

# Metadata indicating an image maintainer
# LABEL maintainer="Your Name <your.email@example.com>"
LABEL maintainer="Joshua Mumo <joshuambiyu002@gmail.com>"

# Expose the NATS Streaming port
EXPOSE 4222

# Set the default NATS Streaming Server configuration file
# COPY nats-streaming.conf /etc/nats-streaming.conf

# Command to start the NATS Streaming Server when the container is run
CMD ["nats-streaming-server", "-c", "/etc/nats-streaming.conf"]
