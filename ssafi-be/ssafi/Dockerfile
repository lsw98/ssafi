FROM jenkins/jenkins:lts

# Java 17을 설치
USER root
RUN apt-get update && apt-get install -y openjdk-17-jdk

# Java 17을 기본으로 설정
RUN update-alternatives --set java /usr/lib/jvm/java-17-openjdk-amd64/bin/java
RUN update-alternatives --set javac /usr/lib/jvm/java-17-openjdk-amd64/bin/javac

USER jenkins

WORKDIR .
COPY /build/libs/*.jar ssafi.jar
ENTRYPOINT ["java", "-jar", "ssafi.jar"]