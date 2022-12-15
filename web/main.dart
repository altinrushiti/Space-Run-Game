import 'dart:html';

void main() {
  querySelector('#header').innerHtml = '<h1>Hoooray, your first Dart App is running!</h1>';
  querySelector('#footer').innerHtml += '<p>Now, containerize the world!</>';
}
