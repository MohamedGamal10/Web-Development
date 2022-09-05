#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Mazr3a.csproj", "Mazr3a/"]
RUN dotnet restore "Mazr3a/Mazr3a.csproj"
COPY . .
WORKDIR "/src/Mazr3a"
RUN dotnet build "Mazr3a.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Mazr3a.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Mazr3a.dll"]