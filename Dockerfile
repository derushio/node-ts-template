FROM node:10 AS build-env
ARG NODE_ENV

RUN apt update
RUN apt install -y apt-transport-https
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install -y rsync yarn

ENV SV_FRONTEND_DIR "/opt/frontend"
ADD "./" "$SV_FRONTEND_DIR/"
WORKDIR "$SV_FRONTEND_DIR"
RUN yarn install --production=false && yarn build

# for webapp
# ENV SV_WEBAPP_DIR "/opt/webapp"
# ADD "./webapp/" "$SV_WEBAPP_DIR/"
# WORKDIR "$SV_WEBAPP_DIR"
# RUN if [ "$NODE_ENV" != "development" ]; then \
#     yarn install --production=false && \
#     yarn build && \
#     rsync -avh "./dist/" "$SV_FRONTEND_DIR/public/" && \
#     rm -rf "node_modules"; \
# fi

# WORKDIR "$SV_FRONTEND_DIR"
# RUN rm -rf "./webapp"

# --------------------------------------------------------------

FROM node:10-alpine
ENV SV_FRONTEND_DIR "/opt/frontend"
COPY --from=build-env "$SV_FRONTEND_DIR" "$SV_FRONTEND_DIR"
CMD [ "node", "/opt/frontend/dist/main.bundle.js" ]
