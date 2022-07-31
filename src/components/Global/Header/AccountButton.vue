<script setup>
import profilePicBlue from "@/assets/image/profilePic-blue.png";
import profilePicYellow from "@/assets/image/profilePic-yellow.png";
import profilePicRed from "@/assets/image/profilePic-red.png";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUserStore } from "@/stores/user.js";

library.add(faXmark);
const { logOutHanlder } = useUserStore();
</script>

<template>
  <div class="account-dropdown-button">
    <div class="account-img">
      <img :src="profilePicBlue" alt="" />
    </div>
    <span class="arrow-icon"></span>
    <div class="dropdown-list">
      <div class="dropdwon-arrow-wrapper">
        <div class="dropdown-arrow"></div>
      </div>
      <div class="list-section">
        <ul>
          <li>
            <a class="profile-link">
              <div class="icon">
                <div class="account-img">
                  <img :src="profilePicYellow" alt="" />
                </div>
              </div>
              <div class="txt">使用者1</div>
            </a>
          </li>
          <li>
            <a class="profile-link">
              <div class="icon">
                <div class="account-img">
                  <img :src="profilePicRed" alt="" />
                </div>
              </div>
              <div class="txt">使用者2</div>
            </a>
          </li>
          <li>
            <a class="profile-link">
              <div class="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="Hawkins-Icon Hawkins-Icon-Standard"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22.2071 7.79285L15.2071 0.792847L13.7929 2.20706L20.7929 9.20706L22.2071 7.79285ZM13.2071 3.79285C12.8166 3.40232 12.1834 3.40232 11.7929 3.79285L2.29289 13.2928C2.10536 13.4804 2 13.7347 2 14V20C2 20.5522 2.44772 21 3 21H9C9.26522 21 9.51957 20.8946 9.70711 20.7071L19.2071 11.2071C19.5976 10.8165 19.5976 10.1834 19.2071 9.79285L13.2071 3.79285ZM17.0858 10.5L8.58579 19H4V14.4142L12.5 5.91417L17.0858 10.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="txt">管理使用者</div>
            </a>
          </li>
        </ul>
      </div>
      <div class="list-section">
        <ul>
          <li>
            <a class="profile-link">
              <div class="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="Hawkins-Icon Hawkins-Icon-Standard"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M9.00011 8C9.00011 6.34315 10.3433 5 12.0001 5C13.657 5 15.0001 6.34315 15.0001 8C15.0001 9.65685 13.657 11 12.0001 11C10.3433 11 9.00011 9.65685 9.00011 8ZM12.0001 3C9.23869 3 7.00011 5.23858 7.00011 8C7.00011 10.7614 9.23869 13 12.0001 13C14.7615 13 17.0001 10.7614 17.0001 8C17.0001 5.23858 14.7615 3 12.0001 3ZM5.98069 21.1961C6.46867 18.7563 8.61095 17 11.0991 17H12.9011C15.3893 17 17.5316 18.7563 18.0195 21.1961L19.9807 20.8039C19.3057 17.4292 16.3426 15 12.9011 15H11.0991C7.65759 15 4.69447 17.4292 4.01953 20.8039L5.98069 21.1961Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="txt">帳戶</div>
            </a>
          </li>
          <li>
            <a class="profile-link">
              <div class="icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="Hawkins-Icon Hawkins-Icon-Standard"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12ZM12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM12 8.5C10.6831 8.5 10 9.24303 10 10H8C8 7.75697 10.0032 6.5 12 6.5C13.9968 6.5 16 7.75697 16 10C16 11.3487 14.9191 12.2679 13.8217 12.68C13.5572 12.7793 13.3322 12.9295 13.1858 13.0913C13.0452 13.2467 13 13.383 13 13.5V14H11V13.5C11 12.0649 12.1677 11.1647 13.1186 10.8076C13.8476 10.5339 14 10.1482 14 10C14 9.24303 13.3169 8.5 12 8.5ZM13.5 16.5C13.5 17.3284 12.8284 18 12 18C11.1716 18 10.5 17.3284 10.5 16.5C10.5 15.6716 11.1716 15 12 15C12.8284 15 13.5 15.6716 13.5 16.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <div class="txt">說明中心</div>
            </a>
          </li>
        </ul>
      </div>
      <div class="list-section">
        <li>
          <a @click="logOutHanlder">登出 Netflix</a>
        </li>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account-dropdown-button {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;

  &:hover {
    .dropdown-list {
      display: block;
    }
  }
  .arrow-icon {
    margin-left: 10px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 5px 0 5px;
    border-color: #fff transparent transparent transparent;
    transition: transform 367ms cubic-bezier(0.21, 0, 0.07, 1);
  }

  .dropdown-list {
    display: none;
    position: absolute;
    top: 52px;
    background: var(--account-dropdown-bg);
    width: 180px;
    right: 0;
    border: 1px solid var(--account-border-color);

    .profile-link {
      display: flex;
      align-items: center;
      color: var(--color-text);
      &:hover {
        .txt {
          text-decoration: underline;
        }
      }
    }

    .dropdwon-arrow-wrapper {
      position: absolute;
      top: -31px;
      right: 20px;
      padding-top: 30px;
      padding-left: 15px;
      padding-right: 15px;
    }
    .dropdown-arrow {
      position: absolute;
      right: 5px;
      bottom: 0;

      border-width: 7px;
      margin-left: -7px;
      border-color: transparent transparent #e5e5e5;
      border-style: solid;
      height: 0;
      width: 0;
    }
    .list-section {
      padding: 7px 0px;
      border-bottom: 1px solid var(--account-border-color);
    }
    ul {
      padding: 0;
      margin: 0;
    }
    ul,
    li {
      list-style: none;
    }
    a {
      color: var(--color-text);
      display: inline-block;
      width: 100%;
      text-align: center;
    }

    li {
      display: flex;
      align-items: center;
      padding: 6px 10px;
      cursor: pointer;
      .icon {
        width: 32px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          color: #b3b3b3;
        }
      }
    }
  }
}
.account-img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
}
</style>
