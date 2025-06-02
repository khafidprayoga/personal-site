# Belajar Membuat Service gRPC

RPC (Remote Prodcedur Call) merupakan sebuah protokol komunikasi pada komputer yang dapat digunakan untuk menghubungkan fungsi-fungsi pada pemrograman dengan bahasa yang berbeda, maupun komputer yang berbeda lokasi atau terdistribusi.

Format data yang dikirim secara umum menggunakan json (JSON-RPC) atau bisa juga dengan xml (XML-RPC), contoh protokol yang menggunakan format xml adalah SOAP (Simple Object Access Protocol). Pada materi yang kita bahasa kali ini kita akan menggunakan gRPC (gprc remote procedure call) yang format pertukaran datanya menggunakan Protobuf, bisa juga JSON (dengan menggunakan grpc-gateway). gRPC sendiri merupakan project yang di rilis secara open-source oleh Google pada bulan Agustus tahun 2016.

Bayangkan gambar berikut ini ada beberapa services yang saling berkaitan untuk mendukung keperluan bisnis digital:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740754252974/860afdff-ab81-4274-9e98-a0606738bf80.png)

Microservice architecture with RPC

Benefit yang didapat ketika 3 services tersebut (auth, invoice, payment) saling terpisah maka ketika ada service yang gagal beroperasi kita akan langsung memperbaiki service yang bermasalah. Dalam proses debugging dan perbaikan bug akan menjadi lebih mudah, karena masing-masing kode didalam service terpisah tidak digabung menjadi satu.

Misalnya ketika pada payment service bermasalah, dan kemudian perusahaan memutuskan untuk mengganti *Payment Gateway*. Maka service yang lain tidak akan terpengaruh karena kita sudah memiliki format interface pertukaran data (message) yang sudah seseuai antar service.

Bisa dikatakan masing-masing service saling berdiri sendiri dan terpisah, namun kelompok service tersebut saling berkaitan untuk mendukung operasional bisnis.

Lalu pada gambar tersebut terdapat gateway untuk mengakses service tersebut, dalam istilah teknisnya lebih umum disebut API Gateway. Tugasnya adalah mengatur routing menuju service internal yang dibutuhkan oleh client, analoginya seperti *reverse-proxy* yang fungsinya juga untuk mengekspose service internal (private) yang diakses dari luar jaringan komputer.

Apabila anda sebagai *developer* masih bingung dengan konsep tersebut coba perhatikan gambar berikut ini:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740754254916/1263ce14-f20d-49e2-a56d-57e7a4d7f444.png)

Greet function

Misalnya saya mempunyai *function* atau *method* **Greet()** yang ditulis mengunakan bahasa Golang yang terkenal simple dan powerfull. Kemudian client menggunakan bahasa Typescript membutuhkan method tersebut yang otomatis membutuhkan akses ke source code yang kita tulis menggunakan Golang.

Nah, untuk melakukan request/response kita menggunakan gRPC yang format pertukaran datanya menggunakan protobuf agar bisa saling terhubung antara client-server. Melalui gRPC dan protobuf kita akan mendapatkan source code *stub* dan *mocks* yang dibuatkan oleh compiler *protoc*.

Untuk mempermudah dalam memahami gRPC saya pastikan anda sudah memahami bahasa dengan *static-type* karena akan mempermudah proses belajar kita yang mana fitur utamanya adalah *Typesafe,* jadi error akan terjadi ditangani compiler bukan di runtime program ketika sudah berjalan.

Ada pun beberapa komponen yang digunakan untuk menjalankan operasi service gRPC sebagai berikut:

## Service Definition

Anda perlu mendefinisikan cara kerja service yang akan beroperasi dengan menggunakan IDL (Interface Definition Language) yang disediakan oleh Protobuf.

Secara garis besar, anda perlu menuliskan: nama service, format model data request/response, bagaimana cara komunikasinya, dan beberapa konfigurasi lain seperti import package dan penamaan packages pada target bahasa yang akan dipakai.

Setelah semua komponen pendukung komunikasi sudah ditulis, anda akan mengcompile file .proto ke target bahasa pemrograman yang akan dipakai menggunakan protoc. Namun pada artikel ini kita secara *tidak langsung* akan menggunakan protoc sebagai tools untuk membuild file hasil generate dari *.proto.* Dengan menggunakan [Buf.build](https://buf.build/), kita cukup menyediakan konfigurasi dalam file YAML, dan otomatis akan membuatkan command *protoc* yang bisa membuat pekerjaan lebih cepat dan efisien.

### Message Type (Asynchronous/Synchronous)

Model komunikasi dalam gRPC yang asynchronous memiliki istilah Streaming Data, sedangkan model komunikasi synchronous memiliki istilah Unary Call. Pada intinya proses asynchronous tidak akan memblokir thread utama untuk melanjutkan proses selanjutnya, misal pada Golang terdapat konsep *goroutine* dan pada Javascript terdapat konsep *async/await*.

> Stream data, merupakan jenis data yang dikirim secara terus-menerus, dan kita tidak perlu menunggu untuk mendapatkan datanya secara utuh dan menyeluruh untuk dapat melakukan operasi tertentu. Contohnya ketika anda membaca teks file, program akan membaca file .txt line-by-line sampai proses tersebut selesai, atau terdapat interupsi.

> ~ [Streaming Data — Wikipedia](https://en.wikipedia.org/wiki/Streaming_data)

Selain itu komunikasi antar client-server pada gRPC bisa menggunakan satu arah (one direction), maupun secara bersamaan (bidirectional). Dalam model komunikasi gRPC juga terdapat standart status code yang mirip dengan HTTP, misalnya untuk status code 200 OK pada gRPC akan bernilai 0 OK, untuk lebih lengkapnya anda bisa [lihat disini](https://grpc.github.io/grpc/core/md_doc_statuscodes.html).

Kita akan membuah sebuah service yang bernama **Student Service** untuk menyimpan sebuah data mahasiswa didalam suatu kampus. Penulis akan memilih Typescript sebagai client dalam gRPC dan menulis logika bisnis service tersebut dalam bahasa Golang.

Namun pada kenyataannya ketika mengimplementasikan services gRPC, anda bebas menggunakan bahasa apapun, selama [didukung oleh gRPC](https://grpc.io/docs/languages/). Menarik bukan? mari kita mendesain cara kerja sistem service tersebut bekerja.

Pada bagian ini kita akan fokus menulis interface model komunikasi client-server dalam file .proto, yang berisi definisi dan skema komunikasi untuk diimplementasikan pada *student service*. Sebelum lanjut terlalu jauh siapkan beberapa tools prasyarat dibawah ini, untuk memulai mengikuti artikel ini:

1. Go v1.19.x
    
2. Javascript: v18.14.x dan Typescript v4.9.x
    
3. Protoc: protoc-gen-go v1.30.0 dan protoc-gen-go-grpc 1.3.0
    
4. Buf Build: v1.15.1
    
5. Git: v2.38.1
    
Pertama silahkan instal golang terlebih dahulu, untuk lebih lengkapnya silahkan [baca disini](https://go.dev/dl/), dan pastikan mengunakan v1.19.x agar tidak terjadi error ketika menjalankan source-codenya nanti.

Apabila anda sudah berhasil menginstal golang, silahkan jalankan perintah `go version` untuk memeriksa proses instalasi anda. Setelah itu jalankan perintah dibawah ini untuk menginstal tools *protoc* dan *buf* dengan menggunakan Go Mod.

```bash
# Installing Buf CLI for .proto builder 
go install github.com/bufbuild/buf/cmd/buf@1.15.1

# Installing grpc utility tools 
go install github.com/fullstorydev/grpcurl/cmd/grpcurl@latest go install github.com/fullstorydev/grpcui/cmd/grpcui@latest

# Installing protoc build tools for golang 
go install google.golang.org/protobuf/cmd/protoc-gen-go@1.30.0 
go install google.golang.org/protobuf/cmd/protoc-gen-go-grpc@1.3.0
```

Untuk mempermudah menginstal Node.js anda bisa menggunakan NVM (Node Version Manager), silalahkan [baca disini](https://github.com/nvm-sh/nvm#installing-and-updating). Kemudian anda perlu menginstal Typescript compiler secara global dengan npm, silahkan gunakan perintah berikut:

```bash
npm install --global typescript@v4.9.x ts-node
```

Kemudian jalankan perintah `tsc --version` untuk memastikan compiler Typescript sudah terinstal secara global.

Pada bagian ini kita akan fokus menulis definisi format message dalam file .proto, sebelum kita menulis services kita silahkan init module baru pada golang, dan buat folder seperti dibawah ini:

```bash
proto/
├── buf.yaml
└── student
    └── v2
        └── student.proto

2 directories, 2 files
# buat working directory baru
mkdir student-svc

# pindah directory
cd student-svc

# init go module
go mod init github.com/khafidprayoga/student-svc

# membuat working directory untuk service proto
mkdir -p proto/student/v2
```

> Catatan: semua source-code dapat anda lihat selengkapnya pada repository github saya: [https://github.com/khafidprayoga/student-svc](https://github.com/khafidprayoga/student-svc) , pada artikel ini cukup ikuti alur saja dan apabila ada yang kurang jelas silahkan clone repository tersebut sebagai panduan.

Pada struktur directory diatas terdapat main directory yang dengan format sebagai berikut **proto/{service-name}/{proto-message-version}**, ini bukan standart dari protobuf melainkan sebuah *style-guide* untuk mempermudah kedepannya.

Hal tersebut mempermudahkan ketika service yang akan kita implementasikan, saling berhubungan dengan service yang lain seperti pada gambar pertama diatas (Auth, Payment, Invoice service).

Kemudian silahkan buat file pada student proto dengan perintah berikut `touch proto/student/v2/student.proto` . Setelah berhasil membuat file tersebut, silahkan salin kode .proto dibawah ini:

```go
syntax = "proto3";

package student.v2;

import "google/protobuf/timestamp.proto";
option  go_package = "github.com/khafidprayoga/student-svc/v2;studentv2";

enum StudentNationality{
  STUDENT_NATIONALITY_UNSPECIFIED = 0;
  STUDENT_NATIONALITY_CITIZEN = 1;
  STUDENT_NATIONALITY_FOREIGN = 2;
}

enum GenderType {
  GENDER_TYPE_UNSPECIFIED = 0;
  GENDER_TYPE_MALE = 1;
  GENDER_TYPE_FEMALE = 2;
  GENDER_TYPE_OTHER = 3;
}

message CreateStudentRequest{
  string full_name = 2;
  google.protobuf.Timestamp  birth_date = 3;
  GenderType gender = 4;
  string address = 5;
  repeated string hobbies = 6;
  StudentNationality nationality = 7;
  string email = 8;
}

message CreateStudentResponse{
  string id = 1;
  string full_name = 2;
  google.protobuf.Timestamp birth_date = 3;
  int32 gender = 4;
  string address = 5;
  repeated string hobbies = 6;
  int32 nationality = 7;
  string email = 8;
}

message GetDetailStudentRequest {
  string student_id = 1;
}

message GetDetailStudentResponse{
  string id = 1;
  string full_name = 2;
  google.protobuf.Timestamp birth_date = 3;
  int32 gender = 4;
  string address = 5;
  repeated string hobbies = 6;
  int32 nationality = 7;
  string email = 8;
  google.protobuf.Timestamp created_at = 9;
  google.protobuf.Timestamp updated_at = 10;
}

message GetListStudentRequest{}
message GetListStudentResponse{
  repeated GetDetailStudentResponse details = 1;
}

message DeleteStudentRequest {
  string student_id = 1;
}

message DeleteStudentResponse{
  string message = 1;
}

service StudentService{
  rpc CreateStudent(CreateStudentRequest) returns (CreateStudentResponse);
  rpc GetDetailStudent(GetDetailStudentRequest) returns (GetDetailStudentResponse);
  rpc DeleteStudent(DeleteStudentRequest) returns (DeleteStudentResponse);
  rpc GetListStudent(GetListStudentRequest) returns (GetListStudentResponse);
}
```

Pada kode tersebut terdapat beberapa hal berikut ini:

* Pada kode tersebut kita mendefinisikan format message dengan proto versi 3, yang lebih aman dari proto versi 2.
    
* Nama package dari file proto, yakni student.v2
    
* Import dependensi dari file proto milik google, Timestamp.proto yang nantinya digunakan untuk memformat `time.Time`pada package golang menjadi format timestamp standart dari Google.
    
* Option dari target build langugae yakni Golang, berisi nama module yang kita init tadi; dan nama package yang akan digenerate nanti *studentv2*.
    
* Enum berisi konstanta jenis kelamin, dan kewarganegaraan
    
* Request/Response Message yang digunakan untuk format pertukaran data nanti antar client-server.
    
* Terakhir adalah nama service kita beserta method-method yang akan dipakai oleh client.
    
> Untuk memahami lebih jelas mengenai syntax dari Protocol Buffers silahkan kunjungi dokumentasi resminya:

> Language Guide (proto 3): [https://protobuf.dev/programming-guides/proto3/](https://protobuf.dev/programming-guides/proto3/)

Selanjutnya silahkan buat file buf.yaml dengan perintah berikut `touch proto/buf.yaml` . Salin kode berikut dan simpan.

```yaml
version: v1
name: buf.build/khafidprayoga/student-svc
deps:
  - buf.build/googleapis/googleapis
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
```

Pada kode file yaml tersebut terdapat hal sebagai berikut ini:

* `version`yang merupakan versi build interface dari Buf.Build
    
* `name` yang nantinya anda bisa gunakan untuk mempublish package hasil generate proto ke remote repository yang bernama **Buf Schema Registry**, konsepnya mirip seperti Docker Hub
    
* `deps` dependensi pada file proto, misalnya pada file proto tadi terdapat kode yang mengimport package *timestamp.proto* milik Google
    
* `breaking` untuk mengecek ketika ada perubahan yang membuat breaking API yang sudah beredar. Misalnya pada request CreateStudent terdapat variable `full_name`dengan type `string` dan menggunakan tag nomor `2` , dan suatu saat anda tiba-tiba menggunakan tag nomor `2` dengan property lain misal menjadi `first_name` .
    
* `lint` berisi konfigurasi buf linter, yang akan mengecek kode proto kita misal penamaan varible anda `fullName` akan mendapatkan instruksi untuk menggantinya ke snake-case
    
> The `buf.yaml` file defines a [module](https://buf.build/docs/bsr/module/manage/), and is placed at the root of the Protobuf source files it defines. The placement of the `buf.yaml` configuration tells `buf` where to search for `.proto` files, and how to handle imports.

> This file contains [lint](https://buf.build/docs/lint/rules/) and [breaking change detection](https://buf.build/docs/breaking/rules/) rules, and if applicable, the name of your module and a list of dependencies.  
> [https://buf.build/docs/configuration/v1/buf-yaml](https://buf.build/docs/configuration/v1/buf-yaml)

Terakhir silahkan pindah ke root working directory `student-svc/` kemudian buat file buf.gen.yaml dengan perintah berikut `touch buf.gen.yaml` , dan salin kode berikut ini:

```yaml
version: v1
managed:
  enabled: true
  go_package_prefix:
    default: github.com/khafidprayoga/student-svc/gen
    except:
      - buf.build/googleapis/googleapis
plugins:
  - name: go
    out: gen
    opt: paths=source_relative
  - plugin: buf.build/grpc/go
    out: gen
    opt:
      - paths=source_relative
  - plugin: grpc-gateway
    out: gen
    opt:
      - paths=source_relative
      - generate_unbound_methods=true
  - plugin: buf.build/community/timostamm-protobuf-ts
    out: client/gen
```

Pada intinya file `buf.gen.yaml` merupakan file konfigurasi build untuk men-generate stub dan mocks client-server

> The `buf.gen.yaml` file defines a local plugin template, and is used by the `buf generate` command to generate code for the language(s) of your choice.  
> [https://buf.build/docs/configuration/v1/buf-gen-yaml/](https://buf.build/docs/configuration/v1/buf-gen-yaml/)

Setelah semuanya sudah siap saatnya kita mulai berinteraksi dengan build script milik Buf, silahkan pindah ke working space directory `student-svc` . Kemudian jalankan perintah `buf generate proto/` yang memilik maksud untuk membuild file `.proto` pada direktori `proto/` menjadi client/server mocks dan stub interface dalam bahasa Golang dan Typescript, hasilnya akan menjadi seperti berikut ini:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740754256677/802e0b08-ca24-4749-ab00-84959aa26f08.png )

Build result from student.proto

Secara spesifik hasil build akan disimpan pada directory berikut

* `/gen/student/v2` untuk interface pada bahasa Golang
    
* `/client/gen` untuk interface pada bahasa Typescript
    
Setelah file hasil generate dari protoc yang dibuat lewat Buf, anda bisa langsung menginstal denpendency atau library yang dibutuhkan oleh client-server dalam mengoperasikan service gRPC.

Silahkan jalankan perintah `go mod tidy` pada working directory yang bertujuan untuk menginstal import library yang missing pada dependency graph Golang, apabila sudah selesai nanti akan mengupdate file `go.mod` yang berisi list library yang dibutuhkan server, dan akan terdapat file bernama `go.sum` berisi checksum dari packages yang didownload melalui [https://pkg.go.dev/](https://pkg.go.dev/) .

Apabila terjadi error seperti dibawah ini:

```plaintext
github.com/khafidprayoga/student-svc imports
        github.com/khafidprayoga/student-svc/common/config: no matching versions for query "latest"
github.com/khafidprayoga/student-svc imports
        github.com/khafidprayoga/student-svc/common/constant: no matching versions for query "latest"
github.com/khafidprayoga/student-svc imports
        github.com/khafidprayoga/student-svc/common/data: no matching versions for query "latest"
github.com/khafidprayoga/student-svc imports
        github.com/khafidprayoga/student-svc/svc: no matching versions for query "latest
```

Itu terjadi karena module package pada local git anda tidak ditemukan directorynya, jadi go module akan berusaha mencari lewat hostname `github.com` . Untuk saat ini silahkan saja melihat implementasinya pada repository github milik saya `https://github.com/khafidprayoga/student-svc`

Untuk folder client pada Typescript silahkan init module baru dengan perintah `tsc --init` untuk menghasilkan file `tsconfig.json`dan jalankan perintah `npm install` untuk memulai menginstal library yang dibutuhkan oleh client, nantinya akan mengahasilkan file `package.json` dan `package-lock.json` .

Oh iya target output versi Javascript pada file konfigurasi `tsconfig.json` adalah `ES2020` karena ada fitur yang tidak akan berjalan jika versinya kurang dibawah target tersebut, namanya adalah `BigNumber`yang akan dipakai interaksi pada library Timestamp proto milik Google.

Selain Buf bisa membuatkan interface antara client-server secara definitif, mudah, dan menarik. Tools tersebut juga terdapat linter, yang bisa mendeteksi kesalahan pada file `.proto` yang kita tulis jika tidak sesuai dengan standart atau style guide mereka, silahkan [baca disini](https://buf.build/docs/best-practices/style-guide).

Sekarang coba ubah field `full_name` pada method `CreateStudentRequest` menjadi `fullName` . Kemudian jalankan perintah `buf lint proto/` , maka akan terjadi warning seperti dibawah ini:

proto/student/v2/student.proto:22:10:Field name "fullName" should be lower\_snake\_case, such as "full\_name".

Dan yang terkahir, fitur yang menarik ialah:

## Breaking Changes Detection

Buf bisa mendeteksi breaking changes dari format message yang kita tulis, misalnya tag 2 sudah dialokasikan ke property `full_name` kemudian propertynya anda ubah menjadi `first_name` maka akan terjadi warning dibawah ini:

```plaintext
<input>:1:1:Previously present file "proto/student/v2/student.proto" was deleted.
proto/student/v2/student.proto:22:3:Field "2" with name "first_name" on message "CreateStudentRequest" changed option "json_name" from "fullName" to "firstName".
proto/student/v2/student.proto:22:10:Field "2" on message "CreateStudentRequest" changed name from "full_name" to "first_name".
```

Untuk membuat warning dan error tersebut saya menjalankan command berikut

`buf breaking proto/ --against=".git#branch=master"`

yang memiliki maksud untuk melakukan pengecekan branch sekarang apakah merusak format message pada branch `master` yang sudah ada. Hal itu sangat bermanfaat apabila service anda sudah public dan banyak yang memakai, solusinya adalah membuat versi baru.

> Oh iya, saya sendiri membuat versi `student-svc` langsung versi 2 karena pada versi 1 saya mengimplementasikannya menggunakan [https://connect.build](https://connect.build) protocol yang bisa menjalankan gRPC dan REST secara dual stack dalam 1 server.

> Untuk versi implementasi dengan protocol tersebut saya simpan pada branch `connect-go-examples`

#### Buf Schema Registry

Remote repository dapat memperkecil ukuran build artifact, pada intinya folder `gen/` dan `client/gen` yang ada di local akan dipublishkan ke repository Buf Registry, dan selain itu file `.proto` juga akan otomatis berada disana, menariknya anda juga bisa menulis dokumentasi service anda dengan file `markdown`.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1740754258770/d72a1bd8-52af-4a02-9d6a-ac7f2d7aa3ce.png)

Saya rasa cukup sampai disini, karena tulisan ini sudah terlalu panjang silahkan explore sendiri jika tertarik dengan build system yang lebih modern (Buf.Build), dan jangan lupa juga untuk mencoba menggunakan Connect Protocol. Untuk implementasi server gRPCnya saya menggunakan in-memory database dengan *map\\[string\\]any*, dan pada sisi client implementasinya saya melakukan rpc call method GetStudentDetail.

Pada initial data terdapat student dengan id "**seed**" yakni user awal yang otomatis di insert pada memory ketika servernya dijalankan.

## Referensi

* [Protobuf Documentation](https://protobuf.dev/overview/)
    
* [Getting Started with the Buf CLI](https://buf.build/docs/tutorials/getting-started-with-buf-cli/)
    
* [Connect Protocol How To](https://connect.build/docs/introduction)
    
* [Awesome gRPC](https://github.com/grpc-ecosystem/awesome-grpc)