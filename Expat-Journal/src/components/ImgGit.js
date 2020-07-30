import axiosWithAuth from "../utilities/axiosWithAuth";

// const ImgData = [
//     {
//     id:0,
//     Title:"NYC Vacation",
//     ImgURL:"https://images.unsplash.com/photo-1519121785383-3229633bb75b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80",
//     //from: unsplash.com by Luke Stackpoole https://unsplash.com/@withluke
//     Comment:"First day at Time Square."
//     },
//      {
//     id:1,
//     Title:"Cruz'in in Cali!!!",
//     ImgURL:"https://images.unsplash.com/photo-1513144978978-c22ccdc06f9a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=618&q=80",
//     //from: unsplash.com by Shea Rouda https://unsplash.com/@shrouda
//     Comment:"These Tacos are the Bomb.com!!!"
//     },
//     {
//     id:2,
//     Title:"Florida Beach",
//     ImgURL:"https://images.unsplash.com/photo-1512936702668-1ab037aced2a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//     //from: unsplash.com by Joël de Vriend https://unsplash.com/@joeldevriend
//     Comment:"Its Splash time!"
//     },
//     {
//      id:3,
//      Title:"South Korea",
//      ImgURL:"https://images.unsplash.com/photo-1561988648-a05445411ae7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80",
//      //from: unsplash.com by Chan Hyuk Moon https://unsplash.com/@mch1565
//      Comment:"Its time for our team to become World Champions!"
//     },
//]
const ImgsData = props => {
  const [Imgs, setImgs] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/images")
      .then(function(response) {
        setImgs(response.data);
        console.log(response);
      });
  }, []);

  useEffect(() => {
    console.log(Imgs);
  }, [Imgs]);

  //add an button =(https://ptct-expat-journal-backend.herokuapp.com/users/addImages)
  return Imgs.map((data, i) => <ImgCard data={data} key={i} />);
};
