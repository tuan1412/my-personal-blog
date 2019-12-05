---
title: "DTO Conversion với Model Mapper"
featuredImage: './cover.png'
sapo: Khi viết RestApi ta chỉ thường chọn một số thông tin để truyền về client. Từ đó, ta cần convert sang cái gọi là data transfer object (DTO)
tags: ['java']
categories: ['Chuyện code']
date: "2019-11-12"
---
## Đặt vấn đề
Khi viết RestAPI ta chỉ thường chọn một số thông tin để truyền về client. Ví dụ như thông tin user thì không cần truyền password chẳng hạn. Từ đó ta cần convert data trả về sang data transfer object (DTO)

## Tại sao lại là ModelMapper
Vì lười :') Thông thường việc chuyển dữ liệu từ đối tượng ban đầu sang DTO mất nhiều thời gian, code lặp lại nhiều. Ví dụ như sau:
```java
public class User {
	private long id;
	private String username;
	private String password;
	private String avatar;
	private String fullname;
	private List<Question> questions;
	
    // getter setter 
}
public class Question {
	private long id;
	private String title;
	private String content;
	private User user;

	// getter setter
}
```
Ta cần truyền 2 dto tương ứng là: 
```java

public class QuestionDto {
	private long id;
	private String title;
	private String content;
	private long userId;
	private String userUsername;
	private String avatarUser;

   // getter setter
 
public class UserDto {
	private long id;
	private String username;
	private String avatar;
	private String fullname;
	private List<TitleQuestion> questions;

   // getter setter
 
  public static class TitleQuestion {
		private long id;
		private String title;

	   // getter setter
}
```
Code bằng tay sẽ như sau: 
```java
UserDto userDto = new UserDto();
userDto.setAvatar(user.getAvatar());
userDto.setFullname(user.getFullname());
userDto.setUsername(user.getUsername());
userDto.setId(user.getId());
List<TitleQuestion> titleQuestions = user.getQuestions()
	.stream()
	.map(q -> new TitleQuestion(q.getId(), q.getTitle()))
	.collect(Collectors.toList());
userDto.setQuestions(titleQuestions);
```
Model Mapper là thư viện để chuyển đổi đối tượng ban đầu sang dto, dễ dùng và rất linh hoạt.  
Với cùng công việc như trên ta chỉ cần: 
``` java
ModelMapper modelMapper = new ModelMapper();
UserDto userDto = modelMapper.map(user, UserDto.class);
QuestionDto questionDto = modelMapper.map(question, QuestionDto.class);
```
Nhìn 2 đoạn code thì bạn nên dùng như thế nào rồi chứ :simle:

## Cách sử dụng
Bạn có thể tải trực tiếp thư viện và cài trong classpath. Hoặc bạn nào dùng maven thì add đoạn sau vào pom.xml
```xml
<dependency>
  <groupId>org.modelmapper</groupId>
  <artifactId>modelmapper</artifactId>
  <version>2.0.0</version>
</dependency>
```
Nhìn ví dụ bạn cũng có thể hiểu qua cách nó mapping các trường tương ứng. ModelMapper có Matching Strategies (default là Standart) được mô tả như sau:
- Các thuộc tính của nguồn và đích sẽ được tokenizer ví dụ để convert thuộc tính avatar thì ở bên question là question.getUser.getAvatar() thành question.user.avatar còn  bên questiondto là questionDto.getAvatarUser thành questionDto.avatar.user.
- Thứ tự trùng nhau không quan trọng bạn có thể viết tên thuộc tính là avatarUser hay userAvatar đều được
- Sau khi tokenizer hóa như trên thì ModelMapper dựa vào đó để tìm dữ liệu tương ứng

Đến đây có thể một số bạn đặt ra câu hỏi là nếu đích có một số trường không có ở đối tượng ban đầu hoặc trường đó chỉ dựa vào dữ liệu ban đầu chứ không giống hoàn toàn thì sao? Cái này ModelMapper thể hiện rõ sự linh hoạt qua việc sử dụng Converter.

Ví dụ ở questionDto ta muốn tên avatar có đường dẫn chứ không phải tên ảnh thì ta làm như sau:
```java
@Test
public void testConvertAvatar() {
	ModelMapper modelMapper = new ModelMapper();
	Converter<String, String> covertAvatarUrl = context -> "http://localhost:8080/file/" + context.getSource();
	modelMapper.addMappings(new PropertyMap<Question, QuestionDto>() {
		@Override
		protected void configure() {
			using(covertAvatarUrl).map(source.getUser().getAvatar()).setAvatarUser(null);		
		}		
	});
	Question question = questions.get(0);
	QuestionDto questionDto = modelMapper.map(question, QuestionDto.class);
	assertEquals("http://localhost:8080/file/avatar.png", questionDto.getAvatarUser());
}
```
Bạn để ý hàm Converter. <String, String> là thể hiện kiểu đầu vào và ra. context.getSource() là dữ liệu đầu vào.
Sau khi có hàm Converter ta add vào modelMapper. Ở đây mình làm hardcode. Còn bình thường thì nên gọi contextUrlPath để add nhé.

Vậy khi nào bạn muốn thêm trường gì hoặc biến đổi trường gì chỉ cần khai báo thêm Converter và add tương ứng là được.
Ngoài ra khi làm với Spring, bạn nên khai báo model mapper thành một Bean (tức là thêm anotation @Bean) để tận dụng được các tính năng như @Autowired hay Singleton nhé.

## Kết luận
ModelMapper còn rất nhiều tính năng và cách cài đặt. Tuy nhiên mình tin rằng với cần trên thông tin bạn đã giải quyết được hầu hết trường hợp cần mapping. Bài viết còn thiếu sót mong các bạn góp ý.

Link github code bài viết: https://github.com/tuan1412/modelmapper-example

## Tài liệu tham khảo
[1]. http://modelmapper.org/getting-started/

[2]. http://www.baeldung.com/entity-to-and-from-dto-for-a-java-spring-application

[3]. https://stackoverflow.com/questions/44534172/how-to-customize-modelmapper