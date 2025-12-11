plugins {
    java
    id("org.springframework.boot") version "3.5.7"
    id("io.spring.dependency-management") version "1.1.7"

    id("com.diffplug.spotless") version "8.0.0"
}

group = "io.github.alizarazot"

version = "0.0.1-SNAPSHOT"

description = "Inmobiliaria"

java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }

spotless {
    format("misc") {
        target("*.gradle", ".gitattributes", ".gitignore")

        trimTrailingWhitespace()
        leadingTabsToSpaces()
        endWithNewline()
    }

    java {
        googleJavaFormat("1.30.0").reflowLongStrings().formatJavadoc(true).reorderImports(true)
        removeUnusedImports("cleanthat-javaparser-unnecessaryimport")
        forbidWildcardImports()
        formatAnnotations()
    }

    kotlinGradle {
        target("*.gradle.kts")
        ktfmt("0.54").kotlinlangStyle()
    }
}

repositories { mavenCentral() }

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.google.genai:google-genai:1.30.0")
    implementation("org.postgresql:postgresql")
    implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")

    developmentOnly("org.springframework.boot:spring-boot-devtools")
}

tasks.withType<Test> { useJUnitPlatform() }
