uniform vec2 u_resolution;
uniform float u_time; // frame 数
varying vec2 vUv; // fragmentShaderに渡すためのvarying変数

void main() {
  vec2 st = vUv * u_resolution;
  st.x *= u_resolution.x / u_resolution.y;

  float barWidth = 4.0;
  float speed = 50.0;
  float waveFrequency = 2.0;
  float waveAmplitude = 20.0;
  float wave = sin(st.x * waveFrequency + u_time * speed) * waveAmplitude;

  float color = step(5.0 + wave, mod(st.x + u_time * speed, barWidth * 2.0));

  gl_FragColor = vec4(vec3(0.0, color, color), 1.0);
}
