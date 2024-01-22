package com.example.englishtest.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class WebSecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((requests) -> requests                
                .requestMatchers("/css/**", "/images/**", "/js/**", "/").permitAll()  // すべてのユーザーにアクセスを許可するURL
                .requestMatchers("/", "/rangeselect").permitAll()  // ハンドラメソッドURLを全てのユーザーにアクセスする許可
              
                .anyRequest().authenticated()                   // 上記以外のURLはログインが必要（会員または管理者のどちらでもOK）
            );
            
        return http.build();
    }
    
    
}
