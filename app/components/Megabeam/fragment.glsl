uniform vec2 u_resolution; // window のサイズ情報
uniform float u_time; // frame 数
varying vec2 vUv; // fragmentShaderに渡すためのvarying変数

void main() {
  vec2 st = vUv * u_resolution; // window のサイズに合わせた座標に変換
  st.x *= u_resolution.x / u_resolution.y;

  float barWidth = 4.0; // バーの幅
  float speed = 0.1; // バーのスピード
  float waveFrequency = 1.0; // 波の周波数
  float waveAmplitude = 10.0; // 波の振幅
  float wave = sin(st.x * waveFrequency + u_time * speed) * waveAmplitude; // 波の計算

  float color = step(5.0 + wave, mod(st.x + u_time * speed, barWidth * 2.0)); // バーの色

  gl_FragColor = vec4(vec3(0.0, color, color), 1.0); // バーの色
}
