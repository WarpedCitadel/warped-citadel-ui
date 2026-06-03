FROM node:24-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.30.2-alpine AS runner

RUN addgroup -S wc_secure_role && adduser -S wc_dev -G wc_secure_role

COPY --from=builder --chown=wc_dev:wc_secure_role /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
