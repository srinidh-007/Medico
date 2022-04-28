
# Install node v16
FROM node:14-alpine

# Set the workdir /usr/src/medico
WORKDIR /usr/src/medico

# Copy the package.json to workdir
COPY package.json /usr/src/medico

# Run npm install - install the npm dependencies
RUN npm install

# Copy application source
COPY . .


# Expose application ports
EXPOSE 4000

# Start the application
CMD ["npm", "start"]
