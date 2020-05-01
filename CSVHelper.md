# CSV Helper
> Parser de CSV para .Net disponível [aqui](https://joshclose.github.io/CsvHelper/)


# Leitura de CSV
* Para realizar a leitura, basta criar a classe indicando os atributos a serem lidos conforme abaixo:
```c#
  public class MyEntity {
        [CsvHelper.Configuration.Attributes.Index(0)] //Index é usado pelo CSVHelper para identificar a posição da coluna
        public string name{ get; set; }
        [CsvHelper.Configuration.Attributes.Index(1)]
        public string cpf { get; set; }
        [CsvHelper.Configuration.Attributes.Index(2)]
        public string mobile { get; set; }
        [CsvHelper.Configuration.Attributes.Index(3)]
        public string phone1 { get; set; }
        [CsvHelper.Configuration.Attributes.Index(4)]
        public string phone2 { get; set; }
  }
```
* E então realizar a leitura conforme o código abaixo:
```c#
public void ReadCSV(string content){
    byte[] byteArray= Convert.FromBase64String(content);
    string stringContent= System.Text.Encoding.UTF8.GetString(byteArray);
    MemoryStream stream = new MemoryStream(byteArray);
    int count = 0;
    using (var reader = new StreamReader(stream))
    using (var csv = new CsvReader(reader, CultureInfo.GetCultureInfo("pt-br"))) {
        csv.Configuration.HasHeaderRecord = true;
        csv.Configuration.Delimiter = ";";
        //csv.Configuration.RegisterClassMap<MyEntityMap>(); <--adicionar essa linha se o mapping de leitura exigir alguma conversao de dados
        //var options = new TypeConverterOptions { Formats = new[] { Constants.DateFormat } };
        //csv.Configuration.TypeConverterOptionsCache.AddOptions<DateTime>(options);
        csv.Configuration.ReadingExceptionOccurred = ex => {
            string errorContent = ex.InnerException.Message + ".Linha:" + ex.ReadingContext.RawRow + ".Coluna:" + ex.ReadingContext.CurrentIndex;
            if (ex.ReadingContext.Record.Length >= ex.ReadingContext.CurrentIndex) errorContent += ".Célula:" + ex.ReadingContext.Record[ex.ReadingContext.CurrentIndex];
            Logger.LogError(HttpContext.Current.Request.UserHostAddress, "ThisClass", "ThisFunction", errorContent);
            return false;
        };
        List<MyEntity> records = csv.GetRecords<MyEntity>().ToList();
}
```
* Caso seja necessário realizar alguma conversão de um field antes de fazer a leitura, criar uma classe de mapping conforme abaixo:
```c#
  public sealed class MyEntityMap : ClassMap<MyEntity> {
        public MyEntityMap() {
            Map(m => m.name);
            Map(m => m.cpf);
            Map(m => m.mobile);
            Map(m => m.phone1);
            Map(m => m.phone2);
            Map(m => m.creationDate).TypeConverterOption.Format(Constants.DateFormat);
        }
  }
```

# Gravação do CSV
* Para gravar um csv, utilize o código abaixo:
```c#
public HttpMessageResponse GetMyCSV(){
    string clientAddress = HttpContext.Current.Request.UserHostAddress;
    var stream = new MemoryStream();
    List<EEmployee> list = new List<EEmployee>();
    using (var context = new DBInteractor()) {
        list = context.Employees.Select(x => x).ToList();
    }
    using (var writer = new StreamWriter(stream))
    using (var csv = new CsvWriter(writer, CultureInfo.GetCultureInfo("pt-br"))) {
        csv.Configuration.Delimiter = ";";
        csv.Configuration.RegisterClassMap<MyEntityMap>();
        //var options = new TypeConverterOptions { Formats = new[] { Constants.DateFormat } };
        //csv.Configuration.TypeConverterOptionsCache.AddOptions<DateTime>(options);
        csv.WriteRecords(list);
    }
    var result = new HttpResponseMessage(HttpStatusCode.OK) {
        Content = new ByteArrayContent(stream.ToArray())
    };
    //o angular ignorou isso abaixo, mas talvez funcione sem o angular
    result.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment") {
        FileName = "MyFile.csv"
    };
    result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
    return result;
}
```

# Download do CSV no Angular
* Para fazer o download do csv gerado pelo Angular, adicione o código abaixo:
```ts
//adicionar npm i file-saver --save
//adicionar o import import {saveAs} from 'file-saver';
async btnDownloadClicked() {
    try {
      this.loadingDownload = true;
      let result = await this.myService.getMyCSV().toPromise();
      this.loadingDownload = false;
      let blob = new Blob([result], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, 'MyFile.csv');
    } catch (ex) {
      this.errorContentDownload = 'Erro interno';
      this.loadingDownload = false;
      console.log(ex);
    }
  }
```