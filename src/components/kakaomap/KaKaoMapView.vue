<template>
  <div align="center">
    <div id="map" cols="12"></div>
    <ul id="category">
      <li id="BK9" data-order="0" @click="onClickCategory($event)">
        <span class="category_bg bank"></span>
        은행
      </li>
      <li id="MT1" data-order="1" @click="onClickCategory($event)">
        <span class="category_bg mart"></span>
        마트
      </li>
      <li id="PM9" data-order="2" @click="onClickCategory($event)">
        <span class="category_bg pharmacy"></span>
        약국
      </li>
      <li id="HP8" data-order="3" @click="onClickCategory($event)">
        <span class="category_bg pharmacy"></span>
        병원
      </li>
      <li id="CE7" data-order="4" @click="onClickCategory($event)">
        <span class="category_bg cafe"></span>
        카페
      </li>
      <li id="FD6" data-order="5" @click="onClickCategory($event)">
        <span class="category_bg cafe"></span>
        식당
      </li>
      <li id="CS2" data-order="6" @click="onClickCategory($event)">
        <span class="category_bg store"></span>
        편의점
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";
export default {
  name: "KakaoMap",
  data() {
    return {
      markers: [],
      infowindow: null,
    };
  },
  computed: {
    ...mapState(houseStore, ["sido", "gugun", "house"]),
  },
  watch: {
    house() {
      console.log(this.house);
      let address = this.house.도로명 + this.house.도로명건물본번호코드;
      if (this.house.도로명건물부번호코드 != "00000") {
        address = address + "-" + this.house.도로명건물부번호코드;
      }
      console.log(address);
      this.geocoder = new kakao.maps.services.Geocoder();
      console.log(this);
      this.geocoder.addressSearch(address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          console.log(this);
          // 결과값으로 받은 위치를 마커로 표시합니다
          var marker = new kakao.maps.Marker({
            map: this.map,
            position: coords,
          });

          // 인포윈도우로 장소에 대한 설명을 표시합니다
          var infowindow = new kakao.maps.InfoWindow({
            content:
              '<div style="width:150px;text-align:center;padding:6px 0;">' +
              this.house.아파트 +
              "</div>",
          });
          infowindow.open(this.map, marker);
          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          this.map.setCenter(coords);
        }
      });
      this.placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 });
      this.markers = []; // 마커를 담을 배열입니다
      this.contentNode = document.createElement("div");
      this.currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다
      this.ps = new kakao.maps.services.Places(this.map);
      kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);
      this.contentNode.className = "placeinfo_wrap";
      this.placeOverlay.setContent(this.contentNode);
    },
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        // "//dapi.kakao.com/v2/maps/sdk.js?appkey=a2e4f154c536b967b3949362c507d2c3&libraries=services";
        "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=a2e4f154c536b967b3949362c507d2c3&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 2,
      };

      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options);
      console.log(this);
    },
    changeSize(size) {
      const container = document.getElementById("map");
      container.style.width = `${size}px`;
      container.style.height = `${size}px`;
      this.map.relayout();
    },
    displayMarker(markerPositions) {
      if (this.markers.length > 0) {
        this.markers.forEach((marker) => marker.setMap(null));
      }

      const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position),
      );

      if (positions.length > 0) {
        this.markers = positions.map(
          (position) =>
            new kakao.maps.Marker({
              map: this.map,
              position,
            }),
        );

        const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds(),
        );

        this.map.setBounds(bounds);
      }
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
    // 카테고리를 클릭했을 때 호출되는 함수입니다
    onClickCategory(event) {
      var target = event.target;
      var id = target.id,
        className = target.className;
      console.log("호출되었음");
      if (className === "on") {
        this.currCategory = "";
        this.changeCategoryClass();
        this.removeMarker();
      } else {
        console.log(id);
        this.currCategory = id;
        this.changeCategoryClass(this);
        this.searchPlaces();
      }
    },
    // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    changeCategoryClass(el) {
      var category = document.getElementById("category"),
        children = category.children,
        i;

      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }

      if (el) {
        el.className = "on";
      }
    },
    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },
    // 카테고리 검색을 요청하는 함수입니다
    searchPlaces() {
      if (!this.currCategory) {
        return;
      }

      // 커스텀 오버레이를 숨깁니다
      this.placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();

      this.ps.categorySearch(this.currCategory, this.placesSearchCB, {
        useMapBounds: true,
      });
    },
    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },
    // 지도에 마커를 표출하는 함수입니다
    displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document
        .getElementById(this.currCategory)
        .getAttribute("data-order");

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = this.addMarker(
          new kakao.maps.LatLng(places[i].y, places[i].x),
          order,
        );

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        ((marker, place) => {
          kakao.maps.event.addListener(marker, "click", () => {
            this.displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    },
    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position, order) {
      if (order == 5) {
        order = 4;
      }
      if (order == 3) {
        order = 2;
      }
      if (order == 6) {
        order = 5;
      }
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions,
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },
    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    displayPlaceInfo(place) {
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content +=
          '    <span title="' +
          place.address_name +
          '">' +
          place.address_name +
          "</span>";
      }

      content +=
        '    <span class="tel">' +
        place.phone +
        "</span>" +
        "</div>" +
        '<div class="after"></div>';

      this.contentNode.innerHTML = content;
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      this.placeOverlay.setMap(this.map);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#map {
  width: 100%;
  height: 400px;
}

.button-group {
  margin: 10px 0px;
}

button {
  margin: 0 3px;
}

.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-family: "Malgun Gothic", dotum, "돋움", sans-serif;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 350px;
}
#category {
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
}
#category li {
  float: left;
  list-style: none;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
}
#category li.on {
  background: #eee;
}
#category li:hover {
  background: #ffe6e6;
  border-left: 1px solid #acacac;
  margin-left: -1px;
}
#category li:last-child {
  margin-right: 0;
  border-right: 0;
}
#category li span {
  display: block;
  margin: 0 auto 3px;
  width: 27px;
  height: 28px;
}
#category li .category_bg {
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png)
    no-repeat;
}
#category li .bank {
  background-position: -10px 0;
}
#category li .mart {
  background-position: -10px -36px;
}
#category li .pharmacy {
  background-position: -10px -72px;
}
#category li .oil {
  background-position: -10px -108px;
}
#category li .cafe {
  background-position: -10px -144px;
}
#category li .store {
  background-position: -10px -180px;
}
#category li.on .category_bg {
  background-position-x: -46px;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 300px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  padding-bottom: 10px;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: #d95050;
  background: #d95050
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
</style>
