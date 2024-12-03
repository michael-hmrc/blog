# Stage 1: Build the application
FROM rust:latest AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Cargo.toml and Cargo.lock first (to leverage Docker layer caching)
COPY Cargo.toml Cargo.lock ./

# Build dependencies first (this will cache the dependencies unless Cargo.toml or Cargo.lock changes)
RUN cargo fetch

# Copy the source code
COPY . .

# Build the project in release mode
RUN cargo build --release

# Stage 2: Create a lightweight final image
FROM debian:buster-slim

# Set up a user for security purposes (optional, but recommended)
RUN adduser --disabled-password --gecos '' appuser

# Set the working directory in the new image
WORKDIR /app

# Copy the compiled binary from the build stage
COPY --from=builder /app/target/release/tarnish /usr/local/bin/tarnish

# Set the user to non-root
USER appuser

# Copy any necessary runtime files like the .env (if needed)
COPY .env.github-actions .env

# Expose the port that the application will run on
EXPOSE 8080

# Run the compiled binary
CMD ["tarnish"]
