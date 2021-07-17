import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clientApi from "../../api/config";
import { GoTriangleDown } from "react-icons/go";
import Loading from "../../components/Loading";

const CustomLink = ({ to, children }) => {
  const match = useLocation();
  return (
    <li className={match.search === to.pathname ? "tag--active" : ""}>
      <Link to={to.pathname}>{children}</Link>
    </li>
  );
};

const CustomLinkMoblie = ({ to, children }) => {
  const match = useLocation();
  return (
    <li className={`match.search === to.pathname ? "tag--active" : ""`}>
      <Link to={to.pathname}>{children}</Link>
    </li>
  );
};

const Tag = ({ content, slug }) => {
  return (
    <div className="tag-container">
      <CustomLink
        to={{
          pathname: `?genres=${slug}`,
          search: `?genres=${slug}`,
        }}
      >
        {content}
      </CustomLink>
    </div>
  );
};

const ListTag = ({ isMobile }) => {
  const location = useLocation();
  const [tagData, setTagData] = useState({
    loading: false,
    data: [],
  });

  useEffect(() => {
    const getData = async () => {
      const fetchData = await clientApi.get("/genres");
      setTagData((p) => ({
        ...p,
        data: fetchData.results,
      }));
    };
    getData();
  }, []);

  const [show, setShow] = useState(false);

  if (tagData.loading) return <Loading />;

  return (
    <div>
      {isMobile && (
        <div className="filter-box">
          <div className="filter-box__selected">
            <p>
              {location.search.split("=")[0] === "?gener"
                ? location.search.split("=")[1] || "action"
                : "action"}
            </p>
          </div>
          <div className="filter-box__drop-down">
            <input type="checkbox" id="vehicle1" style={{ display: "none" }} />
            <label htmlFor="vehicle1">
              <GoTriangleDown onClick={() => setShow((p) => !p)} />
            </label>
          </div>
        </div>
      )}
      <div className={`list-tag ${isMobile ? "mobile-list" : ""}`}>
        {isMobile &&
          show &&
          tagData.data.map((el) => (
            <Tag key={el.name} content={el.name} slug={el.slug} />
          ))}
        {!isMobile &&
          tagData.data.map((el) => (
            <Tag key={el.name} content={el.name} slug={el.slug} />
          ))}
      </div>
    </div>
  );
};

export default ListTag;
