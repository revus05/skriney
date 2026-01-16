# ---------- Stage 1: Build ----------
FROM maven:3.9.4-eclipse-temurin-20 AS build

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline

COPY src ./src

RUN mvn spotless:apply

RUN mvn clean package -DskipTests

# ---------- Stage 1: Run ----------
FROM eclipse-temurin:20-jre-alpine

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV JAVA_OPTS=""

EXPOSE 8080
EXPOSE 9090

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
