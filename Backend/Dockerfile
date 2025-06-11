# Base image for Node.js
FROM node:20

# Install Python and Conda
RUN apt-get update && apt-get install -y curl bzip2 python3 python3-pip libgl1 \
    && curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh \
    && bash Miniconda3-latest-Linux-x86_64.sh -b -p /opt/conda \
    && rm Miniconda3-latest-Linux-x86_64.sh \
    && /opt/conda/bin/conda init

ENV PATH="/opt/conda/bin:$PATH"

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Install Node.js dependencies
RUN npm install

# Create Conda environment
RUN conda env create -f environment.yml

# Activate environment
ENV PATH="/opt/conda/envs/breast_cancer_app_conda_env/bin:$PATH"
ENV CONDA_DEFAULT_ENV=breast_cancer_app_conda_env

# Expose port 80 (Azure uses this)
EXPOSE 80

# Tell Azure to use Node's server on port 80
ENV PORT=80

# Start Node.js server
CMD ["node", "app.js"]
